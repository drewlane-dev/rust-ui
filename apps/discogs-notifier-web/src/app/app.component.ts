import {Component, Inject, OnInit} from '@angular/core';
import {Link} from '@best-practice/common/navigation';
import {APP_CONFIG, AppConfig} from '@best-practice/common/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public readonly title: string;
  links: Link[] = [
    {href: './home', label: 'Home', icon: 'home'},
    {href: './table', label: 'Inventory', icon: 'table'},
    ];

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    this.title = config.title;
  }

  ngOnInit(): void {}
}
