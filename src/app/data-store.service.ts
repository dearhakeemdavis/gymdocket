import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(
  	public storage: Storage
  	) { }

  set(key: string, value: any) {
  	return this.storage.set(`setting:${ key }`, value);
  }

  async get(key: string) {
  	let tmpKey: string = 'tmp';
  	return await this.storage.get(`setting:${ tmpKey }`);
  }

  async remove(key: string) {
  	return await this.storage.remove(`setting:${ key }`);
  }

  clear() {
  	this.storage.clear();
  }
}
