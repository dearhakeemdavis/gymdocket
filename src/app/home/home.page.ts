import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

// service
import { ListService } from '../list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	lists: any = [];
  currentChoice: string = '';
  title: string = '';

  constructor(
  	private translate: TranslateService,
  	private listService: ListService,
    private router: Router
	) {
    this.translate.get(['home.title']).subscribe((res: string) => {
      this.title = res['home.title']
    });
  }

  ngOnInit() {
  	this.getLists();
  }

  getLists() {
  	this.listService.get_lists()
    .then((info: any) => {
      console.log('info: ', info);
      this.lists = info;
    });
  }

  selectList() {
    console.log('list selected: ', this.currentChoice);
    this.router.navigate(['view/' + this.currentChoice]);
  }

  newList() {
    console.log('new list...');
  }

}
