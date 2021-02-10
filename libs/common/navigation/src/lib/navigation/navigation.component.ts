import {Component, Inject, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {animate, group, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {Link} from '../link';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Server, serverActions, serverSelectors, Time } from '@best-practice/common/server-store';
import { selectCurrentServer } from '../../../../server-store/src/lib/store/server.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [
    trigger('flyInOutToolbar', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(-50%)', opacity: 0 }),
        animate(300)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ]),


  ]

})
export class NavigationComponent implements OnInit {

  @Output()
  readonly sidebarOpened = new EventEmitter<boolean>();

  @Input()
  links: Link[];

  @Input()
  title = 'Default App Name';

  public readonly time: Subject<any> = new Subject<any>();
  public readonly currentServer$: Observable<Server>;
  public readonly currentServerTime$: Observable<Time>;

  constructor(private http: HttpClient, private store: Store) {
    this.currentServer$ = this.store.select(serverSelectors.selectCurrentServer).pipe(filter(server => server !== undefined));
    this.currentServerTime$ = this.store.select(serverSelectors.selectCurrentServerTime);
  }

  ngOnInit(): void {
    this.currentServer$.subscribe(server => {
      console.log('Got Here!');
      this.store.dispatch(serverActions.time({id: server.id}));
    });
    this.currentServerTime$.pipe(
      filter(time => time !== undefined),
      map((time) => {
        let currMins = (time.time > time.sunset) ? (24 - time.time + time.sunrise) : time.sunrise - time.time;
        console.log(`currMins ${currMins}`);
        if (time.time > time.sunrise && time.time < time.sunset) {
          return {
            state: 'Day',
            minutesUntilNextState: Math.floor((time.dayLengthMinutes/24) * ((time.sunset - time.time))),
            time: `${Math.floor(time.time)}:${Math.floor((time.time - Math.floor(time.time))*60)}`,
            nextState: 'Night'
          }
        }else {

            return {
              state: 'Night',
              minutesUntilNextState: Math.floor((time.dayLengthMinutes / 24) * (currMins)),
              time: `${Math.floor(time.time)}:${Math.floor((time.time - Math.floor(time.time))*60)}`,
              nextState: 'Day'
            };
        }

      })
    ).subscribe((daylight) => {
      this.time.next(daylight);
    });
  }

}
