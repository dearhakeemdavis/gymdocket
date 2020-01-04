import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
	IonicModule,
	TranslateModule
	],
	declarations: [
	HeaderComponent,
	FooterComponent,
	],
	exports: [
	HeaderComponent,
	FooterComponent,
	],
	entryComponents: [
	]
})

export class ComponentsModule{}