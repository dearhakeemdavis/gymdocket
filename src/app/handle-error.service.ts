import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

	genericError: string;

  constructor(private translate: TranslateService) {
  	this.translate.get(['error.unable']).subscribe((res: string) => {
        this.genericError = res['error.unable']
    });
  }

  handleError(error: HttpErrorResponse) {
  	if (error.error instanceof ErrorEvent) {
    } else {
    }

    return throwError(this.genericError);
  };
}
