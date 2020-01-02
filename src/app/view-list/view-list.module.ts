import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../shared-comp-module/components.module';

import { ViewListPage } from './view-list.page';

//service
import { ListService } from '../list.service';

const routes: Routes = [
  {
    path: '',
    component: ViewListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    TranslateModule
  ],
  declarations: [
  ViewListPage
  ],
  providers: [ListService]
})
export class ViewListPageModule {}
