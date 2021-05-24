import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '@services/user-profile/user-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  userData: any = [];
  userGroups: any = [];
  subscription!: Subscription;

  ngOnInit(): void {
    this.getUserData();

  }

  getUserData(): void {
    this.spinner.show();
    this.subscription = this.userProfileService.getUserData()
      // tslint:disable-next-line: deprecation
      .subscribe(
        {
          next: (user) => this.userFound(user),
          error: () => this.errorOccured(),
          complete: () => this.fetchingComplete()

        }
      );
  }

  // get user data callbacks
  private userFound(user: { [key: string]: any }): any {
    // this.spinner.hide();
    this.userData = user;
    this.userGroups = user[`groups`];
  }

  private errorOccured(): any {
    this.spinner.hide();
  }

  private fetchingComplete(): any {
    this.spinner.hide();
  }

  changePrimaryPhoneNumber(): void {
    this.router.navigate(['changePrimaryPhoneNumber']);
  }

  changeSecondaryPhoneNumber(): void {
    this.router.navigate(['changeSecondaryPhoneNumber']);
  }


  addSecondaryPhoneNumber(): void {
    this.router.navigate(['addSecondaryPhoneNumber']);
  }

  deleteSecondaryPhoneNumber(): void {
    console.log('delete phone number clicked ');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
