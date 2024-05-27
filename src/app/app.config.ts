import {ApplicationConfig, inject} from '@angular/core';
import {provideRouter, Router} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {
  HttpErrorResponse,
  HttpHandlerFn, HttpHeaders,
  HttpInterceptorFn,
  HttpRequest, HttpStatusCode,
  provideHttpClient,
  withInterceptors
} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {UserService} from "./shared/user.service";


const intercept: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const profileService = inject(UserService);
  const router = inject(Router);
  let clonedRequest = req.clone({url: `http://localhost:4200/api/${req.url}`});
  return next(clonedRequest)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          profileService.logout()
            .subscribe(() => {
              router.navigate(['/auth/login']);
            })
        }

        return throwError(() => err);
      })
    );
}
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideToastr(), provideHttpClient(withInterceptors([intercept]))],
};
