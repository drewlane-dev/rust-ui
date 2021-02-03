import { Component } from '@angular/core';
import {AuthService} from '@best-practice/common/auth';

@Component({
  selector: 'best-practice-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private readonly auth: AuthService) {
    console.log(`Injected Auth Service!`);
    console.log(this.auth.isLoggedIn());
  }
}
