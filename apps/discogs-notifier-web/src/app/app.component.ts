import {Component, Inject, OnInit} from '@angular/core';
import {Link} from '@best-practice/common/navigation';
import {APP_CONFIG, AppConfig} from '@best-practice/common/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { serverActions, serverSelectors } from '@best-practice/common/server-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public readonly title: string;
  public readonly time: Subject<any> = new Subject<any>();
  public readonly links$: Observable<Link[]>;


  constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient, private store: Store) {
    this.title = config.title;
    this.links$ = this.store.select(serverSelectors.selectServers).pipe(
      map(servers => {
        console.log(servers);
        let links = [
          {href: `./home`, label: 'Home', icon: 'home'}
        ];
        links = links.concat( servers.map((s) => {
          return {href: `./server/${s.id}`, label: s.name, icon: 'computer'};
        }));
        return links;
      })
    );
  }

  ngOnInit(): void {
    this.links$.pipe(take(1)).subscribe((hrefs) => {
      console.log(hrefs);
    });
    this.store.dispatch(serverActions.list());


  }
}
