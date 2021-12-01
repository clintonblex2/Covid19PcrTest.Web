import { Injectable, Injector } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
  throwError,
  BehaviorSubject,
  fromEvent,
  merge,
  Observer,
} from 'rxjs';
import { retry, catchError, tap, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  message: string;
  isConnected: boolean;
  constructor(
    private toastr: ToastrService,
    private status: HTTPStatus,
    private router: Router,
    private injector: Injector,
    private spinner: NgxSpinnerService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(request).pipe(
      retry(0),
      tap((evt) => {
        console.log('success response', evt);
        if (evt instanceof HttpResponse) {
          if (evt.body) {
            if (evt.body.description != null && evt.body.description != '') {
              this.toastr.success(evt.body.description);
            }
          }
        }
        return evt;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
          return throwError(this.toastr.error(errorMessage));
        } else {
          if (error.error == null) {
            return throwError(
              this.toastr.error('could not get data, please try again')
            );
          }

          if (error.error.error != undefined) {
            return throwError(this.toastr.error(error.error.error_description));
          }
          errorMessage =
            error.error.message ||
            'Could not reach the service at the moment,please try again';
        }
        errorMessage = errorMessage;
        return throwError(this.toastr.error(errorMessage));
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
