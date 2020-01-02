import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config/config';
import { TranslateService } from '@ngx-translate/core';

// service
import { DataStoreService } from './data-store.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

	baseURL: string = Config.baseURL;
	genericError: string;

  	constructor(
  		private http: HttpClient,
  		private translate: TranslateService,
  		private dataStore: DataStoreService
	) {
		this.translate.get(['error.unable']).subscribe((res: string) => {
	        this.genericError = res['error.unable']
	    });
	}

	get_lists() {
		return new Promise(resolve => {
			this.dataStore.get('lists').then(data => {
				if (data) {
					console.log('returning from storage...');
					resolve(data);
				} else {
					console.log('returning from server...');
					this.http.get(`${this.baseURL}/lists`)
					.subscribe(data => {
						this.dataStore.set('lists', data);
						resolve(data);
					});
				}
			});
		});
	}

	get_lists_by_id(id: number) {
		return new Promise(resolve => {
			this.dataStore.get('lists').then((data: any) => {
				if (data) {
					console.log('returning by id from storage...');
					for (let list of (data || [])) {
			  			if (list.id === id) {
			  				resolve(list);
			  				break;
			  			}
			  		}
				} else {
					console.log('returning by id from server: ', id);
					this.http.get(`${this.baseURL}/lists`)
					.subscribe((data: any) => {
						for (let list of (data || [])) {
							console.log(list);
				  			if (list.id === id) {
				  				resolve(list);
				  				break;
				  			}
				  		}
					});
				}
			});
		});
	}

	patch_listss(id: number, workouts: any) {
		let workout = { workouts: workouts };

		return new Promise(resolve => {
			this.get_lists()
			.then((lists: any) => {
				console.log('get_lists lists: ', lists);
				for (let [i, item] of lists.entries()) {
					if (item.id === 1) {
						lists[i] = 1;
					}
				}

				this.http.post(`${this.baseURL}/lists/${id}`, lists)
				.subscribe(data => {
					console.log('update successful: ', data);
					this.dataStore.set('lists', data);
					resolve(data);
				});
			});
		});
	}

	patch_lists(id: number, workouts: any) {
		let workout = { workouts: workouts };

		return new Promise(resolve => {
			this.http.patch(`${this.baseURL}/lists/${id}`, workout)
			.subscribe(data => {
				console.log('update successful: ', data);
				this.dataStore.set('lists', data);
				resolve(data);
			});
		});
	}
}
