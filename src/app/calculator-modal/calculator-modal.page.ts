import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calculator-modal',
  templateUrl: './calculator-modal.page.html',
  styleUrls: ['./calculator-modal.page.scss'],
})
export class CalculatorModalPage implements OnInit {

	workoutId: number;
  barWeight: number = 0;
	weight: number = 0;
	quantity: number = 0;
	total: number = 0;
  alertZeroTotal: any = null;

  constructor(
  	private navParams: NavParams,
    private modalController: ModalController,
    private alertController: AlertController,
    private translate: TranslateService
  	) {
  	this.workoutId = this.navParams.get('id');

    this.translate.get(['calculator.alert.title', 'calculator.alert.message', 'calculator.alert.yes', 'calculator.alert.cancel']).subscribe((res: string) => {
      this.alertZeroTotal = {
        header: res['calculator.alert.title'],
        message: res['calculator.alert.message'],
        buttons: [
          {
            text: res['calculator.alert.cancel'],
            role: 'cancel'
          },
          {
            text: res['calculator.alert.yes'],
            handler: () => {
              this.dismiss(false);
            }
          }
          ]
      }
    });
  }

  ngOnInit() {
  }

  add() {
  	this.total = (this.total + this.barWeight) + (this.weight * this.quantity);
  }

  subtract() {
  	this.total -= (this.weight * this.quantity) + this.barWeight;
  }

  reset() {
    this.barWeight = 0;
    this.weight = 0;
    this.quantity = 0;
  	this.total = 0;
  }

  dismiss(updateTotal: boolean) {
    if (updateTotal && this.total === 0) {
      this.presentAlert();
    } else {
      this.modalController.dismiss({
        id: this.workoutId,
        updateTotal: updateTotal,
        total: this.total
      });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create(this.alertZeroTotal);

    await alert.present();
  }

}
