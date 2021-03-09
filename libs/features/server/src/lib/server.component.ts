import { Component, OnInit } from '@angular/core';
import {Link} from '@best-practice/common/navigation';
import { Params, Router } from '@angular/router';
import { selectQueryParams, selectRouteParams } from '@best-practice/common/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  links: Link[] = [
    {href: './:id/inventory', label: 'Inventory', icon: 'card_giftcard'},
    {href: './:id/for-sale', label: 'For Sale', icon: 'event_seat'},
    ];
  public readonly params$: Observable<Params>;
  public readonly links$: Observable<Link[]>;


  constructor(private router: Router, private readonly store: Store) {
    this.params$ = this.store.select(selectRouteParams);

    this.links$ = this.params$.pipe(
      map(params => {
          return [
            {href: `./${params.id}/summary`, label: 'Summary', icon: 'table'},
            {href: `./${params.id}/for-sale`, label: 'For Sale', icon: 'money'},
            {href: `./${params.id}/inventory`, label: 'Inventory', icon: 'table'},
            {href: `./${params.id}/devices`, label: 'Devices', icon: 'table'},
          ];
      })
    );


  }

  ngOnInit(): void {
  }

}
