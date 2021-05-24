import { AlertsService } from '@alerts/services/alerts.service';
import { AccountsService } from '@services/accounts/accounts.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private alertsService: AlertsService
  ) { }

  showPassword = false;
  showPasswordConfirmation = false;
  currentUrl!: string;

  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      username: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      phone_number: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      password_confirmation: ['', {
        validators: [Validators.required]

      }]
    });

    this.currentUrl = this.router.url;
  }

  get f(): any {
    return this.changePasswordForm.controls;
  }

  resetPassword(): void {
    this.accountsService.resetPassword(this.changePasswordForm.value)
      // tslint:disable-next-line: deprecation
      .subscribe(

        {
          next: () => this.passwordResetSuccessful(),
          error: () => this.passwordResetFailure(),
          complete: () => this.passwordResetComplete()
        }
      );
  }

  // calllbacks 
  private passwordResetSuccessful(): void {
    this.alertsService.success('Password updated successfully.');

  }
  private passwordResetFailure(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(
        () => {
          this.router.navigate([this.currentUrl]);
        }
      );
    this.alertsService.error('Password update failed. Please try again.');

  }
  private passwordResetComplete(): void {
    this.router.navigate(['login']);

  }
}
