import { Component, OnInit } from '@angular/core';
import {AuthService, UserInfo} from '@best-practice/common/auth';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { serverActions, serverSelectors } from '@best-practice/common/server-store';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public readonly userinfo$: Observable<UserInfo> ;
  public readonly isLoggedIn$: Observable<boolean>;

  constructor(private readonly auth: AuthService, private store: Store) {
    this.userinfo$ = auth.userInfo$;
    this.isLoggedIn$ = auth.isLoggedIn$;

  }


  ngOnInit(): void {
    this.store.dispatch(serverActions.list());
  }

  login(): void {
    this.auth.login('/login/locked');
  }

  logout(): void {
    this.auth.logout();
  }

}
