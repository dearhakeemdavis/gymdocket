import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

// service
import { ListService } from '../list.service';

// page
import { CalculatorModalPage } from '../calculator-modal/calculator-modal.page';

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
  calculatorModal: any;

  constructor(
  	private route: ActivatedRoute,
  	private translate: TranslateService,
  	private listService: ListService,
    private modalController: ModalController
  	) {
  	this.translate.get(['viewWorkout.title']).subscribe((res: string) => {
      this.title = res['viewWorkout.title']
    });
  }

  ngOnInit() {
  	this.currentId = parseInt(this.route.snapshot.paramMap.get('id'));
  	this.getList(this.currentId);
  }

  getList(id: number): void {
  	this.listService.get_lists_by_id(id)
  	.then((info: any) => {
      this.sets = {};

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
  	for (let [i, workout] of this.currentList.workouts.entries()) {
  		if (workout.id === id) {
  			for (let [j,set] of workout.sets.entries()) {
  				if (set.num === this.sets[id].num) {
  					if (set.weight !== this.sets[id].weight) {
  						this.currentList.workouts[i].sets[j] = this.sets[id];
  						this.listService.patch_lists(this.currentId, this.currentList.workouts)
              .then(() => {
                this.getList(this.currentId);
              });
              break;
  					}
  				}
  			}
  		}
  	}
  }

  updateReps(id: number) {
  	for (let [i, workout] of this.currentList.workouts.entries()) {
  		if (workout.id === id) {
  			for (let [j,set] of workout.sets.entries()) {
  				if (set.num === this.sets[id].num) {
  					if (set.reps !== this.sets[id].reps) {
  						this.currentList.workouts[i].sets[j] = this.sets[id];
  						this.listService.patch_lists(this.currentId, this.currentList.workouts)
              .then(() => {
                this.getList(this.currentId);
              });
              break;
  					}
  				}
  			}
  		}
  	}
  }

  async openCalculatorModal(id: number) {
    const modal = await this.modalController.create({
      component: CalculatorModalPage,
      componentProps: {
        id: id
      }
    });

    modal.onDidDismiss()
      .then((info: any) => {
        if (info.data.updateTotal) {
          this.sets[id].weight = info.data.total;

          this.updateWeight(id);
        }

    });

    return await modal.present();
  }

}
