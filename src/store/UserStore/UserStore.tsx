import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
  GoogleAuthProvider,
  GithubAuthProvider,
  type AuthProvider,
} from 'firebase/auth';
import { action, computed, makeObservable } from 'mobx';

import { auth } from '@/configs/firebase';

import { LoadingStageModel } from '../models/LoadingStageModel';
import { ValueModel } from '../models/ValueModel';

import type { AlertStore } from '../AlertStore';

export class UserStore {
  private readonly _user: ValueModel<User | null> = new ValueModel<User | null>(null);
  readonly loadingStage = new LoadingStageModel();
  private readonly alertStore: AlertStore;

  constructor(alertStore: AlertStore) {
    this.alertStore = alertStore;

    makeObservable(this, {
      user: computed,
      isAuthorized: computed,
      login: action.bound,
      logout: action.bound,
      loginWithGithub: action.bound,
      loginWithGoogle: action.bound,
      loginWithEmail: action.bound,
      registerWithEmail: action.bound,
    });

    this.initializeFromFirebase();
  }

  get user() {
    return this._user.value;
  }

  get isAuthorized() {
    return !!this.user;
  }

  private initializeFromFirebase = () => {
    this.loadingStage.loading();

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        this.setUser(firebaseUser);
      } else {
        this.resetUser();
      }
      this.loadingStage.success();
    });
  };

  loginWithEmail = async (email: string, password: string) => {
    this.loadingStage.loading();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      this.setUser(result.user);
      this.alertStore.add('Вход выполнен успешно', 'success');
    } catch (error: unknown) {
      this.alertStore.add('Неверные данные', 'error');
      throw error;
    } finally {
      this.loadingStage.success();
    }
  };

  registerWithEmail = async (email: string, password: string) => {
    this.loadingStage.loading();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      this.setUser(result.user);
      this.alertStore.add('Регистрация выполнена успешно', 'success');
    } catch (error: unknown) {
      this.alertStore.add('Ошибка регистрации', 'error');
      throw error;
    } finally {
      this.loadingStage.success();
    }
  };

  login = (firebaseUser: User) => {
    this.setUser(firebaseUser);
    this.alertStore.add('Вход выполнен успешно', 'success');
  };

  private loginWithProvider = async (provider: AuthProvider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      this.login(result.user);
    } catch (error) {
      this.alertStore.add(`Ошибка входа: ${(error as Error).message}`);
    }
  };

  loginWithGoogle = () => this.loginWithProvider(new GoogleAuthProvider());
  loginWithGithub = () => this.loginWithProvider(new GithubAuthProvider());

  logout = async () => {
    this.loadingStage.loading();
    try {
      await signOut(auth);
      this.resetUser();
      this.alertStore.add('Вы вышли из аккаунта', 'info');
    } catch {
      this.loadingStage.error();
      this.alertStore.add('Ошибка при выходе из аккаунта', 'error');
    } finally {
      this.loadingStage.success();
    }
  };

  private setUser = (user: User) => {
    this._user.change(user);
  };

  private resetUser = () => {
    this._user.reset();
  };
}
