import { Component, OnInit } from '@angular/core';
import {Link} from '@best-practice/common/navigation';

@Component({
  selector: 'app-nested-router',
  templateUrl: './nested-router.component.html',
  styleUrls: ['./nested-router.component.css']
})
export class NestedRouterComponent implements OnInit {
  links: Link[] = [
    {href: './sub1', label: 'SubFeature 1', icon: 'card_giftcard'},
    {href: './sub2', label: 'SubFeature 2', icon: 'event_seat'},
    {href: './recursive', label: 'Recursive', icon: 'picture_in_picture_alt'}
    ];
  constructor() { }

  ngOnInit(): void {
  }

}
