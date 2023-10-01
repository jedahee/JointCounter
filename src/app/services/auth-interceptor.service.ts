import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }
  
  // AUTH INTERCEPTOR
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent <any> > {
    const token: string|null = localStorage.getItem('token_jc'); // Get token of JoinCounter
    let request = req; // Get request returned

    if (token != null) { // If token exist...
      request = req.clone({
        setHeaders: {
          auth_token: `${ token }` // Set token to header
        }
      });
    } // If not exist return error 
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status >= 400) {
          console.log(err)
        }

        return throwError( err );

      })
    );
  }
}
