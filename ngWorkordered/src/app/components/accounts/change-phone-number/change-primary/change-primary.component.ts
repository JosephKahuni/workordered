import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from '@services/accounts/accounts.service';
import { Component, OnInit } from '@angular/core';
import { AlertsService } from '@alerts/services/alerts.service';
import { UserProfileService } from '@services/user-profile/user-profile.service';

@Component({
  selector: 'app-change-primary',
  templateUrl: './change-primary.component.html',
  styleUrls: ['./change-primary.component.css']
})
export class ChangePrimaryComponent implements OnInit {

  constructor(
    private router: Router,
    private accountsService: AccountsService,
    private alertsService: AlertsService,
    private fb: FormBuilder,
    private userProfile: UserProfileService
  ) { }

  showPassword = false;
  user: any = [];
  changePrimaryPhoneNumberForm!: FormGroup;

  ngOnInit(): void {
    this.user = this.userProfile.userProfile;

    this.generateForm();
  }

  private generateForm(): void {
    this.changePrimaryPhoneNumberForm = this.fb.group({
      fullname: [this.user.fullname],
      username: [this.user.username],
      payrollNumber: [this.user.payrollNumber],
      currentPhone: [this.user.primaryPhoneNumber],
      primaryPhoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]

    });

  }

  get f(): any {
    return this.changePrimaryPhoneNumberForm.controls;
  }

  changePrimaryPhoneNumber(): void {
    this.accountsService.editPhoneNumber(this.changePrimaryPhoneNumberForm.value)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: () => this.changeSuccess(),
        error: () => this.changeError(),
        complete: () => this.changeComplete()
      });
  }

  private changeSuccess(): void {
    this.alertsService.success('Phone number changed successfully.');
  }

  private changeError(): void {
    this.refreshPage();
    this.alertsService.error('Phone number not changed. Please try again.');
  }

  private changeComplete(): void {
    this.router.navigate(['/']);
  }

  private refreshPage(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(
        () => this.router.navigate([currentUrl])
      );
  }
}
