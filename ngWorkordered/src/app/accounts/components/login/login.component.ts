import { AlertsService } from '@alerts/services/alerts.service';
import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService
  ) { }

  // login form initialization
  loginForm!: FormGroup;

  // toggling password visibility
  showPassword = false;

  private returnUrl!: string;
  private loginSubscription!: Subscription;


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
    this.spinner.show();
    this.loginSubscription = this.accountsService.login(this.loginForm.value)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: () => this.successCallback(),
        error: () => this.errorCallback(),
        complete: () => this.completeCallback()
      });

  }

  private successCallback(): void {
    this.spinner.hide();
  }

  // login error callback
  private errorCallback(): void {
    this.refreshPage();
    this.spinner.hide();
    this.alertsService.error('Invalid login credentials. Please confirm your details and try again.');
  }

  // login complete callback
  private completeCallback(): void {
    this.router.navigate([this.returnUrl]);
    this.spinner.hide();
  }

  private refreshPage(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentUrl]);
      });

  }


  // forgot password link clicked
  changePasswordComponent(): void {
    this.router.navigate(['accounts/changePassword']);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
