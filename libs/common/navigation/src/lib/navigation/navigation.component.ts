import {Component, Inject, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {animate, group, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {Link} from '../link';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
