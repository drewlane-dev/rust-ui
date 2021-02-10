import { Component, OnInit } from '@angular/core';
import {Link} from '@best-practice/common/navigation';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.css']
})
export class ServerDetailComponent implements OnInit {
  links: Link[] = [
    {href: './inventory', label: 'Inventory', icon: 'card_giftcard'},
    {href: './forsale', label: 'For Sale', icon: 'event_seat'},
    ];
  public readonly params$: Observable<Params>;
  readonly serverId: string;
  constructor(private router: Router, private readonly store: Store) {
  }

  ngOnInit(): void {}

}
