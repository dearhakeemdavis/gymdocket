import { ErrorHandler, APP_INITIALIZER, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpConfigInterceptor } from './httpConfig.interceptor';
import {TranslateService, TranslateModule, TranslateLoader, TranslateModuleConfig, MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Config } from '../config/config';

// service
import { ListService } from './list.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams): string {
        return '';
    }
}

export const TRANSLATE_MODULE_CONFIG: TranslateModuleConfig = {
    loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
    },
    missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
};


@NgModule({
  declarations: [
  	AppComponent
  	],
  entryComponents: [],
  imports: [
  	BrowserModule,
  	IonicModule.forRoot(),
  	AppRoutingModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule
	],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    TranslateService,
    ListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
