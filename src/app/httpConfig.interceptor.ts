import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptor {

	genericError: string;
	loading: string;
	isLoading: boolean = false;
	loader: any;

  constructor(
  	private translate: TranslateService,
  	public loadingController: LoadingController
  	) {
  	this.translate.get(['error.unable']).subscribe((res: string) => {
        this.genericError = res['error.unable']
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let customReq: HttpRequest<any> = request;
 	  this.presentLoader();

  	customReq = request.clone({
  		setHeaders: {
  	    'content-type': 'application/json',
  	    'Accept': 'application/json'
	    }
  	});
    
    return next.handle(customReq).pipe(
    	map((event: HttpEvent<any>) => {
    		this.dismissLoader();

      	if (event instanceof HttpResponse) {
          console.log('instanceof HttpResponse: ', event);
      	}

  		  return event;
      	}),
      	catchError((error: HttpErrorResponse) => {
          console.log('catchError: ', error);
          this.dismissLoader();

        	return throwError(this.genericError);
  		})
  	);
  }

  async presentLoader() {
    if(!this.isLoading) {
      this.loader = await this.loadingController.create({
        spinner: 'circles', 
        duration: 3000
      });
      this.isLoading = true;
      return await this.loader.present();
    }
  }

  async dismissLoader() {
    if (this.loader) {
      this.isLoading = false;
      return await this.loader.dismiss();
    }
    
  }
}
