import { AlertsService } from '@services/alerts/alerts.service';
import { CookieService } from 'ngx-cookie-service';
import { AccountsService } from '@services/accounts/accounts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountsService: AccountsService,
    private alertsService: AlertsService,
  ) { }

  // login form initialization
  loginForm!: FormGroup;

  // toggling password visibility
  showPassword = false;

  private returnUrl!: string;
  private loginSubscription!: Subscription;
  private loginStatus = this.accountsService.isLoggedIn;
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: true
  };


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [Validators.required]
      }]
    });

    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  }

  get f(): any {
    return this.loginForm.controls;
  }

  login(): any {
    this.loginSubscription = this.accountsService.login(this.loginForm.value)
      // tslint:disable-next-line: deprecation
      .subscribe({
        // next: () => this.successCallback(),
        error: () => this.errorCallback(),
        complete: () => this.completeCallback()
      });

  }

  // successCallback(): void {
  //   this.navbarService.loggedIn = true;
  // }

  // login error callback
  errorCallback(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentUrl]);
      });
    this.alertsService.error('Invalid login credentials. Please confirm your details and try again.',
      this.alertOptions);
  }

  // login complete callback
  completeCallback(): void {
    this.router.navigate([this.returnUrl]);
  }

  // forgot password link clicked
  changePasswordComponent(): void {
    this.router.navigate(['changePassword']);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
