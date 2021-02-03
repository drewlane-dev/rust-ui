import { Component, OnInit } from '@angular/core';
import {AuthService, UserInfo} from '@best-practice/common/auth';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public readonly userinfo$: Observable<UserInfo> ;
  constructor(private readonly auth: AuthService) {
    this.userinfo$ = auth.userInfo$;
  }


  ngOnInit(): void {
  }

}
