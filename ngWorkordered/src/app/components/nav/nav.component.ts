import { Component, OnInit } from '@angular/core';
import { AccountsService } from '@services/accounts/accounts.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public accountsService: AccountsService,
    private router: Router,
    private cookieService: CookieService,

  ) { }


  ngOnInit(): void {

  }

  logout(): void {
    this.accountsService.logout();
  }

  fetchUserProfile(): void {
    this.router.navigate(['userProfile']);
  }
}
