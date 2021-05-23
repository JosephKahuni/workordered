import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '@services/user-profile/user-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  userData: any = [];
  userGroups: any = [];

  ngOnInit(): void {
    this.spinner.show();
    this.getUserData();
  }

  getUserData(): void {
    this.userProfileService.getUserData()
      // tslint:disable-next-line: deprecation
      .subscribe(
        {
          next: (user) => this.userFound(user),
          // error: ()
        }
      );
  }

  // get user data callbacks
  userFound(user: { [key: string]: any }): any {
    this.spinner.hide();
    this.userData = user;
    this.userGroups = user[`groups`];
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
}
