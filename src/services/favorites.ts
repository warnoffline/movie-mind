import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { db } from '@/configs/firebase';

const COLLECTION = 'users';

export const getFavorites = async (userId: string): Promise<number[]> => {
  const snapshot = await getDoc(doc(db, COLLECTION, userId));
  if (!snapshot.exists()) return [];
  const { favorites = [] } = snapshot.data() as { favorites?: number[] };
  return favorites;
};

export const setFavorites = async (userId: string, favorites: number[]): Promise<void> => {
  await setDoc(doc(db, COLLECTION, userId), { favorites }, { merge: true });
};

export const addFavorite = async (userId: string, movieId: number): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, userId), { favorites: arrayUnion(movieId) });
};

export const removeFavorite = async (userId: string, movieId: number): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, userId), { favorites: arrayRemove(movieId) });
};
