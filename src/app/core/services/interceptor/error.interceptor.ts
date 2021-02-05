import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errMsg = '';
        // Client Side Error
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.error.message}`;
        }
        else {  // Server Side Error
          errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        if (error.status === 401) {
          this.authService.isLoggedInValue = false;
          this.authService.logout();
          this.alertService.error('Redirecting to login as Unauthorized ...', true);
          this.router.navigate(['/']);
        }else if (error.status === 400) {
          this.authService.isLoggedInValue = false;
          this.authService.logout();
          this.alertService.error('Bad Request', true);
          this.router.navigate(['/']);
        } else {
          console.log(errMsg);
        }

        return throwError(errMsg);
      })
      )
  }
}
