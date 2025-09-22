import { Injectable } from '@angular/core';
import { Storage } from './storage';

@Injectable({ providedIn: 'root' })
export class Theme {
  private _DARK_MODE = 'dark-mode';

  constructor(private _storage: Storage) {
    const session = this._storage.getLocalEntry(this._DARK_MODE);
    this.setDarkMode(session ? session === 'true' : (window.matchMedia('(prefers-color-scheme: dark)').matches));
  }

  setDarkMode(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add(this._DARK_MODE);
      this._storage.setLocalEntry(this._DARK_MODE, true);
      localStorage.setItem(this._DARK_MODE, 'true');
    } else {
      document.documentElement.classList.remove(this._DARK_MODE);
      this._storage.setLocalEntry(this._DARK_MODE, false);
    }
  }

  toggleDarkMode() {
    this.setDarkMode(!document.documentElement.classList.contains(this._DARK_MODE));
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains(this._DARK_MODE);
  }
}