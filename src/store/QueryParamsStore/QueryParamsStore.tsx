import { action, makeObservable } from 'mobx';

export class QueryParamsStore {
  private _params: URLSearchParams;

  constructor() {
    this._params = new URLSearchParams(window.location.search);
    makeObservable(this, {
      getParam: action.bound,
      getAllParams: action.bound,
      setParams: action.bound,
    });
  }

  getParam(key: string): string | null {
    return this._params.get(key);
  }

  getAllParams(): Record<string, string> {
    return Object.fromEntries(this._params.entries());
  }

  setParams(key: string, value: string | null) {
    if (value) {
      this._params.set(key, value);
    } else {
      this._params.delete(key);
    }

    this.pushState();
  }

  private pushState() {
    const url = new URL(window.location.href);
    url.search = this._params.toString();
    window.history.replaceState(null, '', url.toString());
  }
}
