import { Component, OnInit } from '@angular/core';
import {AuthService, UserInfo} from '@best-practice/common/auth';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.css']
})
export class LockedComponent implements OnInit {
  public readonly userinfo$: Observable<any>;
  constructor(private readonly auth: AuthService) {
    this.userinfo$ = auth.userInfo$;
  }

  ngOnInit(): void {
  }

}
