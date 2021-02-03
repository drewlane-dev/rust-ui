import {Component, Inject, OnInit} from '@angular/core';
import {Link} from '@best-practice/common/navigation';
import {APP_CONFIG, AppConfig} from '@best-practice/common/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public readonly title: string;
  public readonly time: Subject<any> = new Subject<any>();

  links: Link[] = [
    {href: './home', label: 'Home', icon: 'home'},
    //{href: './table', label: 'Inventory', icon: 'table'},
    {href: './table/for-sale', label: 'For Sale', icon: 'table'},
    ];

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {
    this.title = config.title;
  }

  ngOnInit(): void {}
}
