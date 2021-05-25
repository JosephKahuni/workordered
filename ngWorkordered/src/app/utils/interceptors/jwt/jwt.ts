import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private accountsService: AccountsService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLoggedIn = this.accountsService.isLoggedIn;
        const accessToken = localStorage.getItem('access_token');

        request = isLoggedIn && accessToken ? request.clone({
            setHeaders: { Authorization: `Bearer ${accessToken}` }
        }) : request;
        return next.handle(request);
    }
}
