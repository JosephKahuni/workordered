import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountsService } from '@services/accounts/accounts.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountsService: AccountsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const loggedIn = this.accountsService.isLoggedIn;

        if (loggedIn) {
            return true;
        }

        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
