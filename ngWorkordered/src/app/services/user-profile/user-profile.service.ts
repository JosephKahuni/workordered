import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private http: HttpClient
  ) { }

  accountsUrl = environment.accountsUrl;
  private subject: BehaviorSubject<any> = new BehaviorSubject(null);

  public get userProfile(): any {
    return this.subject.value;
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.accountsUrl}/get-user-data`)
      .pipe(
        tap(
          (user) =>
            this.subject.next(user)
        ),
        shareReplay()
      );
  }


}
