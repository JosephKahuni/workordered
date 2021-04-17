import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { AccountsService } from '@services/accounts/accounts.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public accountsService: AccountsService,
  ) {

  }


  ngOnInit(): void { }

  logout(): void {
    this.accountsService.logout();
  }


}
