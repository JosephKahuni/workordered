import { Component, OnInit } from '@angular/core';
import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public accountsService: AccountsService,
    private router: Router

  ) { }


  ngOnInit(): void {
    console.log('NAV COMPONENT ACTIVE');
    console.log(this.accountsService.isLoggedIn);

  }

  logout(): void {
    this.accountsService.logout();
  }

  fetchUserProfile(): void {
    this.router.navigate(['accounts/userProfile']);
  }
}
