import {Component, Inject, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {animate, group, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {Link} from '../link';
import { HttpClient } from '@angular/common/http';
import { interval, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    interval(5000).pipe(
      switchMap(() => {
        return this.http.get<any>('http://localhost:888/api/map/current/time')
      }),
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
