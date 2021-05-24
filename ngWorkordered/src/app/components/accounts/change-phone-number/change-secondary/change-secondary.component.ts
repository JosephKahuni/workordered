import { AlertsService } from '@alerts/services/alerts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '@services/user-profile/user-profile.service';
import { AccountsService } from '@services/accounts/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-secondary',
  templateUrl: './change-secondary.component.html',
  styleUrls: ['./change-secondary.component.css']
})
export class ChangeSecondaryComponent implements OnInit {

  constructor(
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private router: Router,
    private alertsService: AlertsService
  ) { }

  fullname!: string;
  username!: string;
  payrollNumber!: string;
  secondaryPhoneNumber!: string;
  userData: any = [];
  currentUrl!: string;

  showPassword = false;
  changeSecondaryPhoneNumberForm!: FormGroup;

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    // this.refreshPage();

    this.userData = this.userProfileService.userProfile;

    this.fullname = this.userData.fullname;
    this.username = this.userData[`username`];
    this.payrollNumber = this.userData[`payrollNumber`];
    this.secondaryPhoneNumber = this.userData.alternativePhoneNumber;

    this.changeSecondaryPhoneNumberForm = this.fb.group({
      fullname: [this.fullname],
      username: [this.username],
      payrollNumber: [this.payrollNumber],
      phone: [this.secondaryPhoneNumber],
      alternativePhoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f(): any {
    return this.changeSecondaryPhoneNumberForm.controls;
  }

  changeSecondaryPhoneNumber(): void {
    this.accountsService.editPhoneNumber(this.changeSecondaryPhoneNumberForm.value)
      // tslint:disable-next-line: deprecation
      .subscribe(
        {
          next: () => this.updateSuccessful(),
          error: () => this.updateFailure(),
          complete: () => this.updateComplete()
        }
      );
  }

  // changePhoneNumber callbacks
  private updateSuccessful(): void {
    this.alertsService.success('Phone number changed successfully.');
  }

  private refreshPage(): any {
    return this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([this.currentUrl]));
  }

  private updateFailure(): void {
    this.refreshPage();
    this.alertsService.error('Phone number update failed. Please try again.');
  }

  private updateComplete(): void {
    this.router.navigate(['/']);
  }




}
