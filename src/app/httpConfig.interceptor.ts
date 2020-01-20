import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, Events } from '@ionic/angular';

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
  	public loadingController: LoadingController,
    public events: Events
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
      	}

  		  return event;
      	}),
      	catchError((error: HttpErrorResponse) => {
          this.dismissLoader();

        	return throwError(this.genericError);
  		})
  	);
  }

  presentLoader() {
    this.events.publish('loader:loading', true);
  }

  dismissLoader() {
    this.events.publish('loader:loading', false);
    
  }
}
