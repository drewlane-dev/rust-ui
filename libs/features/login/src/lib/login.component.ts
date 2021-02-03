import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '@best-practice/common/auth';
import {Observable, of} from 'rxjs';
import {Link} from '@best-practice/common/navigation';
import {map} from 'rxjs/operators';
import {APP_CONFIG, AppConfig} from '@best-practice/common/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public readonly isLoggedIn$: Observable<boolean>;
  public readonly links: Observable<Link[]>;
  public readonly authEnabled: boolean;

  constructor(private readonly auth: AuthService, @Inject(APP_CONFIG) private config: AppConfig) {
    this.authEnabled = config.authEnabled;
    this.isLoggedIn$ = auth.isLoggedIn$;
    this.links = this.isLoggedIn$.pipe(map(isLoggedIn => {
      return [{
        href: './locked',
        label: isLoggedIn ? 'Profile' : 'Locked',
        icon: isLoggedIn ? 'person' : 'locked',
        guard: this.auth.isLoggedIn$}];
    }));
  }

  ngOnInit(): void {
  }

  login(): void {
    this.auth.login('/login/locked');
  }

  logout(): void {
    this.auth.logout();
  }

}
