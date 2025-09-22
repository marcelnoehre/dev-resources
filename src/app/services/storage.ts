import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {

  public getLocalEntry(key: string): string | null {
		return localStorage.getItem(key);
	}

	public setLocalEntry(key: string, data: unknown): void {
		localStorage.setItem(key, JSON.stringify(data));
	}

	public deleteLocalEntry(key: string): void {
		localStorage.removeItem(key);
	}

	public clearLocal(): void {
		localStorage.clear();
	}

	public isLocalEmpty(): boolean {
		return localStorage.length === 0;
	}
  
}