import { Component } from '@angular/core';
import {AuthService} from '@best-practice/common/auth';

@Component({
  selector: 'best-practice-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private readonly auth: AuthService) {}

  loginMobile()
  {
    this.auth.loginMobile();
  }
}
