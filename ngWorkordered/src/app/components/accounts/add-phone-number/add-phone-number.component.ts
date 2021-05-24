import { UserProfileService } from '@services/user-profile/user-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '@alerts/services/alerts.service';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '@services/accounts/accounts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-phone-number',
  templateUrl: './add-phone-number.component.html',
  styleUrls: ['./add-phone-number.component.css']
})
export class AddPhoneNumberComponent implements OnInit {

  constructor(
    private router: Router,
    private accountsService: AccountsService,
    private alertsService: AlertsService,
    private fb: FormBuilder,
    private userProfileService: UserProfileService
  ) { }

  showPassword = false;
  userProfile: any = [];
  currentUrl!: string;
  addAlternativePhoneNumberForm!: FormGroup;

  ngOnInit(): void {
    this.userProfile = this.userProfileService.userProfile;
    this.currentUrl = this.router.url;

    this.addAlternativePhoneNumberForm = this.fb.group({
      fullname: [this.userProfile.fullname],
      username: [this.userProfile.username],
      payrollNumber: [this.userProfile.payrollNumber],
      alternativePhoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f(): any {
    return this.addAlternativePhoneNumberForm.controls;
  }

  addAlternativePhoneNumber(): void {
    this.accountsService.editPhoneNumber(this.addAlternativePhoneNumberForm.value)
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: () => this.addSuccessful(),
        error: () => this.addFailed(),
        complete: () => this.addComplete()
      });
  }

  // add phone number callbacks
  private addSuccessful(): void {
    this.alertsService.success('Phone number successfully added.');

  }

  private addFailed(): void {
    this.refreshPage();
    this.alertsService.error('A failure occured. Phone number not saved. Please try again.');

  }

  private addComplete(): void {
    this.router.navigate(['/']);
  }

  private refreshPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(
        () => this.router.navigate([this.currentUrl])
      );
  }

}
