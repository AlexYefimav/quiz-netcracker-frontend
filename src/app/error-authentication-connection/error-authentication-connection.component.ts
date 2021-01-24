// import { Component, OnInit } from '@angular/core';
//
// import { Request, XHRBackend, BrowserXhr, ResponseOptions, RequestOptions, XSRFStrategy,RequestOptionsArgs, Response, Http } from '@angular/http';
// import {Observable} from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import * as HTTP from  '@angular/common/http';
// //import {RequestOptions} from  '@angular/common/http';
//
// @Component({
//   selector: 'app-error-authentication-connection',
//   templateUrl: './error-authentication-connection.component.html',
//   styleUrls: ['./error-authentication-connection.component.css']
// })
// export class ErrorAuthenticationConnectionComponent extends Http implements OnInit{
// import { Observable, throwError } from 'rxjs';
// import { HttpErrorResponse, HttpEvent, HttpHandler,HttpInterceptor, HttpRequest } from '@angular/common/http';
//
// import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/operators';
//
// @Injectable()
// export class ErrorAuthenticationConnectionComponent implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((err: HttpErrorResponse) => {
//         if (err.status == 403) {
//           console.log("EERR 4033333")
//           // Handle 403 error
//         } else {
//           return throwError(err);
//         }
//       })
//     );
//   }
//
// }
import {Component, OnInit} from '@angular/core';

import {PlayerService} from '../service/player.service';
import {UserService} from '../service/user.service';
import {StorageService} from '../service/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/user';
import {Player} from "../model/player";
//import {Dialog} from '../../model/dialog';
//import {DialogsService} from '../../service/dialogs/dialogs.service';
//import {ScheduleEnum} from '../../model/schedule.enum';

@Component({
  selector: 'app-error-authentication-connection',
  template: `<h3>Страница не найдена</h3>`
//  templateUrl: './error-authentication-connection.component.html',
 // styleUrls: ['./error-authentication-connection.component.css']
})
export class ErrorAuthenticationConnectionComponent  {

  // constructor() {
  // }
  //
  // ngOnInit(): void {
  //
  // }


}
