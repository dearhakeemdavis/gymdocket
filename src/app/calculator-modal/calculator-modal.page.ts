import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calculator-modal',
  templateUrl: './calculator-modal.page.html',
  styleUrls: ['./calculator-modal.page.scss'],
})
export class CalculatorModalPage implements OnInit {

	workoutId: number;
	weight: number = 0;
	quantity: number = 0;
	total: number = 0;

  constructor(
  	private navParams: NavParams,
    private modalController: ModalController
  	) {
  	this.workoutId = this.navParams.get('id');
  }

  ngOnInit() {
  }

  add() {
  	console.log('adding...');
  	console.log('total: ', this.weight * this.quantity + this.total);
  	this.total = this.weight * this.quantity + this.total;
  }

  subtract() {
  	console.log('subtract...');
  	console.log('total: ', this.total - (this.weight * this.quantity));
  	this.total -= this.weight * this.quantity;
  }

  reset() {
  	this.total = 0;
  }

  dismiss(updateTotal: boolean) {
  	this.modalController.dismiss({
  		id: this.workoutId,
  		updateTotal: updateTotal,
  		total: this.total
  	});
  }

}
