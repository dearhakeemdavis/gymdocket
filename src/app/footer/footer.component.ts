import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

	loading: boolean = false;
  timer: any;
  startTime: number = 0;
  currentTime: number = 0;

  constructor(
  	public events: Events
  	) {
  	events.subscribe('loader:loading', (isLoading: boolean) => {
  		this.loading = isLoading;
  	});


  }

  ngOnInit() {}

  startTimer() {
    console.log('timer started...');
    this.timer = setInterval(() => {
      this.currentTime += 1;
      console.log('timer: ', this.currentTime);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  resetTimer() {
    this.startTime = 0;
    this.currentTime = 0;
  }
}
