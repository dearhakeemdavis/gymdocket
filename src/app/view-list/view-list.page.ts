import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

// service
import { ListService } from '../list.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.page.html',
  styleUrls: ['./view-list.page.scss'],
})
export class ViewListPage implements OnInit {

	title: string = '';
	currentId: number;
	currentList: any = {};
	sets: any = {};

  constructor(
  	private route: ActivatedRoute,
  	private translate: TranslateService,
  	private listSerice: ListService
  	) {
  	this.translate.get(['viewWorkout.title']).subscribe((res: string) => {
      this.title = res['viewWorkout.title']
    });
  }

  ngOnInit() {
  	this.currentId = parseInt(this.route.snapshot.paramMap.get('id'));
  	console.log('Current id in view: ', this.currentId);
  	this.getList(this.currentId);
  }

  getList(id: number): void {
  	this.listSerice.get_lists_by_id(id)
  	.then((info: any) => {
  		console.log('view list info: ', info);
  		for (let workout of info.workouts) {
  			this.sets[workout.id] = { 
  				num: workout.sets[0].num,
  				weight: workout.sets[0].weight,
  				reps: workout.sets[0].reps
  			};
  		}

  		this.currentList = info;
  	});
  }

  nextSet(id: number) {
  	this.sets[id].num++;
  }

  previousSet(id: number) {
  	if (this.sets[id].num > 1) {
  		this.sets[id].num--;
  	}
  }

  getWeight(id: number) {
  	for (let workout of this.currentList.workouts) {
  		if (workout.id === id) {
  			for (let set of workout.sets) {
  				if (set.num === this.sets[id].num) {
  					return set.weight;
  				}
  			}
  		}
  	}

  	return null;
  }

  getReps(id: number) {
  	for (let workout of this.currentList.workouts) {
  		if (workout.id === id) {
  			for (let set of workout.sets) {
  				if (set.num === this.sets[id].num) {
  					return set.reps;
  				}
  			}
  		}
  	}

  	return null;
  }

  updateWeight(id: number) {
  	console.log('updating weight...');
  	for (let [i, workout] of this.currentList.workouts.entries()) {
  		if (workout.id === id) {
  			for (let [j,set] of workout.sets.entries()) {
  				if (set.num === this.sets[id].num) {
  					if (set.weight !== this.sets[id].weight) {
  						this.currentList.workouts[i].sets[j] = this.sets[id];
  						this.listSerice.patch_lists(id, this.currentList.workouts);
  					}
  				}
  			}
  		}
  	}
  }

  updateReps(id: number) {
  	console.log('updating resp...');
  	for (let [i, workout] of this.currentList.workouts.entries()) {
  		if (workout.id === id) {
  			for (let [j,set] of workout.sets.entries()) {
  				if (set.num === this.sets[id].num) {
  					if (set.reps !== this.sets[id].reps) {
  						this.currentList.workouts[i].sets[j] = this.sets[id];
  						this.listSerice.patch_lists(id, this.currentList.workouts);
  					}
  				}
  			}
  		}
  	}
  }

}
