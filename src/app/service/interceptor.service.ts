import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {StorageService} from './storage/storage.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

    handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error.status);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentUser &&this.storageService.currentToken) {
        req = req.clone({
          setHeaders: {
            Authorization: `${this.storageService.currentToken}`
          }
        });
      }}

    return next.handle(req).pipe(
      catchError(this.handleError)
    )
  }
}
