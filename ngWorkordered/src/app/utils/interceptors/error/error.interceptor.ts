import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    constructor(
        private accountsService: AccountsService,
        private router: Router
    ) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(
                err => {
                    if (err.status === 401) {
                        this.accountsService.logout();
                        this.refreshPage();
                    }
                    const error = err.error.message || err.statusText;
                    return throwError(error);
                }
            ));

    }

    private refreshPage(): void {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(
                () => this.router.navigate([currentUrl])
            );

    }
}
