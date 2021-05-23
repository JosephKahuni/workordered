import { CookieService } from 'ngx-cookie-service';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  private accountsUrl = environment.accountsUrl;
  private jwtHelper = new JwtHelperService();
  private refreshTokenTimeout!: any;
  private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public get isLoggedIn(): any {
    return this.subject.value;
  }

  public get user(): any {
    return this.username.value;
  }

  verifyUniquePayrollNumber(payrollNumber: string): any {
    return this.http.get<any>(`${this.accountsUrl}/verify-unique-payroll-number`,
      {
        params: new HttpParams().set('payroll_number', payrollNumber)
      })
      .pipe(
        shareReplay()
      );
  }

  verifyUniquePhoneNumber(phoneNumber: string): any {
    return this.http.get<any>(`${this.accountsUrl}/verify-unique-phone-number`,
      {
        params: new HttpParams().set('phone_number', phoneNumber)
      })
      .pipe(
        shareReplay()
      );
  }

  confrimIfTechnician(payrollNumber: string): any {
    return this.http.get<any>(`${this.accountsUrl}/confirm-if-technician`,
      { params: new HttpParams().set('payroll_number', payrollNumber) })
      .pipe(shareReplay());
  }

  registerUser(userData: { [key: string]: string }): Observable<any> {
    return this.http.post(`${this.accountsUrl}/register-user`, userData)
      .pipe(shareReplay());
  }

  login(userData: { [key: string]: string }): Observable<any> {
    return this.http.post(`${this.accountsUrl}/api/login/`, userData)
      .pipe(
        tap((user: any) => {
          this.subject.next(true);
          localStorage.setItem('access_token', user[`access`]);
          this.cookieService.set('refresh_token', user[`refresh`], 365);
          this.startRefreshTokenTimer();
          // tslint:disable-next-line: deprecation
          this.getCurrentUser().subscribe();
        }),
        shareReplay()
      );

  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.cookieService.deleteAll();
    this.stopRefreshTokenTimer();
    this.username.next('');
    this.subject.next(false);
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(
        () => {
          this.router.navigate(['/']);
        });
  }

  refreshUser(): Observable<any> {
    const refreshToken = this.cookieService.get('refresh_token');
    const refreshObj = { refresh: refreshToken };

    return refreshToken && refreshObj ?
      this.http.post(`${this.accountsUrl}/api/token/refresh/`, refreshObj)
        .pipe(
          map((user: any) => {
            localStorage.setItem('access_token', user[`access`]);
            this.subject.next(true);
            this.startRefreshTokenTimer();
            // tslint:disable-next-line: deprecation
            this.getCurrentUser().subscribe();

          }),
          shareReplay()) : of(null);
  }

  private startRefreshTokenTimer(): any {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      return;
    }

    const tokenExpiry = this.jwtHelper.getTokenExpirationDate(accessToken);
    const timeout = tokenExpiry?.getTime() as any - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(
      // tslint:disable-next-line: deprecation
      () => this.refreshUser().subscribe(), timeout);

  }

  private stopRefreshTokenTimer(): any {
    clearTimeout(this.refreshTokenTimeout);
  }

  private getCurrentUser(): Observable<any> {
    return this.http.get(`${this.accountsUrl}/get-current-user`)
      .pipe(
        tap(
          (userObj: any) => {
            this.username.next(userObj[`fullname`]);
            this.cookieService.set('currentUser', JSON.stringify(userObj), 365);
          }
        ),
        shareReplay()
      );
  }

  // for changing credentials
  verifyUserExists(query: string, phone: string): any {
    const user = {
      username: query,
      phone_number: phone
    };
    return this.http.post(`${this.accountsUrl}/verify-user-exists`, user)
      .pipe(
        shareReplay()
      );
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.accountsUrl}/reset-password`, data)
      .pipe(
        shareReplay()
      );
  }

  // change/add secondary phone number and change primary phone number
  editPhoneNumber(newPhoneNumber: any): Observable<any> {
    return this.http.post(`${this.accountsUrl}/change-secondary-phone-number`, newPhoneNumber)
      .pipe(
        shareReplay()
      );
  }

}
