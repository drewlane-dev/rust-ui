import { Component, OnInit } from '@angular/core';
import {Link} from '@best-practice/common/navigation';
import { Params, Router } from '@angular/router';
import { selectQueryParams, selectRouteParams } from '@best-practice/common/router';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Server, serverActions, serverSelectors, TeamMember } from '@best-practice/common/server-store';
import { Device } from '../../../../common/server-store/src/lib/store/server.models';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  links: Link[] = [
    {href: './:id/inventory', label: 'Inventory', icon: 'card_giftcard'},
    {href: './:id/for-sale', label: 'For Sale', icon: 'event_seat'},
    ];
  public readonly params$: Observable<Params>;
  public readonly links$: Observable<Link[]>;
  destroy$: Subject<void>;

  public readonly currentServer$: Observable<Server>;
  public readonly devices$: Observable<Device[]>;


  constructor(private router: Router, private readonly store: Store) {
    this.destroy$ = new Subject<void>();

    this.params$ = this.store.select(selectRouteParams);
    this.currentServer$ = this.store.select(serverSelectors.selectCurrentServer).pipe(filter(server => server !== undefined));
    this.devices$ = this.store.select(serverSelectors.selectCurrentServerDevices);
    this.links$ = this.params$.pipe(
      map(params => {
          return [
            {href: `./${params.id}/for-sale`, label: 'For Sale', icon: 'money'},
            {href: `./${params.id}/inventory`, label: 'Inventory', icon: 'table'}
            ];
      })
    );


  }

  ngOnInit(): void {
    this.currentServer$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((server) => {
      this.store.dispatch(serverActions.devices({id: server.id}));
    });
  }

  getIcon(member: TeamMember): string
  {
    if (member.isAlive)
    {
      return 'mood';
    }
    else if (!member.isAlive)
    {
      return 'mood_bad';
    }
  }

  getIconStyle(member: TeamMember): any
  {
    let color = {color: 'gray'};
    if (member.isAlive && member.isOnline)
    {
      color = {color: 'green'};
    }
    else if (!member.isAlive && member.isOnline)
    {
      color = {color: 'red'};
    }
    return color;
  }

}
