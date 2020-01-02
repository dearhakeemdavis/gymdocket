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
 	this.presentLoader();

	request = request.clone({
		setHeaders: {
	      'content-type': 'application/json',
	      'Accept': 'application/json'
	    }
  	});
  
    return next.handle(request).pipe(
    	map((event: HttpEvent<any>) => {
    		this.dismissLoader();

        	if (event instanceof HttpResponse) {
        		console.log('event--->>>', event);
        	}

    		return event;
      	}),
      	catchError((error: HttpErrorResponse) => {
        	console.error('Interceptor error: ', error);
        	//this.dismissLoader();

        	return throwError(this.genericError);
  		})
	);
  }

  presentLoader() {
	this.isLoading = true;

    return this.loadingController.create()
    .then(res => {
    	res.present().then(() => {
			if (!this.isLoading) {
        		res.dismiss();
        	}
    	});
    });
  }

  dismissLoader() {
  	this.isLoading = false;

    return this.loadingController.dismiss();
  }
}
