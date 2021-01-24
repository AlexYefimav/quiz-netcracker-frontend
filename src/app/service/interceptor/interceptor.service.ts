import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {StorageService} from '../storage/storage.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private storageService: StorageService) {
  }

  handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string;
    if (errorResponse.error.Authorization ) {
      errorMessage = `
            Error code: 403!!!
            Title: ${errorResponse.error.title}
            Message: ${errorResponse.error.message}
            HttpStatus: ${errorResponse.error.httpStatus}`;
    }
    if (errorResponse.error != null) {
      errorMessage = `
            Error code: ${errorResponse.error.errorCode}
            Title: ${errorResponse.error.title}
            Message: ${errorResponse.error.message}
            HttpStatus: ${errorResponse.error.httpStatus}`;
    }
    window.alert(errorMessage+" "+errorResponse.error);
    return throwError(errorMessage);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!StorageService.isEmpty()) {
      const currentUser = this.storageService.currentUser;
      const currentToken = this.storageService.currentToken;
      if (currentUser && currentToken) {
        req = req.clone({
          setHeaders: {
            Authorization: `${currentToken}`
          }
        });
      }
    }
    return next.handle(req)
      .pipe(
        catchError(this.handleError)
      );
  }
}
