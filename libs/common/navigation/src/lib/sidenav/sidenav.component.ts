import {Component, Inject, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {animate, group, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {Link} from '../link';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [

    // open and close the sidenav menu
    trigger('openClose', [
      state('open', style({
        width: '{{width}}',
      }), {params: { width: '200px'}}),
      state('closed', style({
        width: '56px',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        group([
          animate('0.3s'),
        ])
      ]),
    ]),
    trigger('openCloseLabels', [
      state('open', style({})),
      state('closed', style({})),
      transition('open => closed', [
        group([
          query('.navigation-label', [
            style({opacity: 0, width: '*'}),
            stagger(30, [
              animate('300ms 500ms', style({opacity: 0, width: 0}))
            ])
          ])
        ])
      ]),
      transition('closed => open', [
        group([
          query('.navigation-label', [
            style({opacity: 0, width: '200px', transform: 'translateY(-50%)'}),
            stagger(30, [
              animate('300ms 200ms', style({opacity: 1, transform: 'translateY(0)'}))
            ])
          ])
        ])
      ]),
    ]),
    trigger('openCloseContent', [
      // ...
      state('open', style({})),
      state('closed', style({})),
      transition('open => closed', [
        group([
          query('.navigation-content', [
            style({opacity: 0, width: '*'}),
            stagger(30, [
              animate('300ms 600ms', style({opacity: 0, width: 0}))
            ])
          ], {optional: true})
        ])
      ]),
      transition('closed => open', [
        group([
          query('.navigation-content', [
            style({opacity: 0, transform: 'translateY(-50%)'}),
            stagger(30, [
              animate('300ms 300ms', style({opacity: 1, transform: 'translateY(0)'}))
            ])
          ], {optional: true})
        ])
      ]),
    ]),
    trigger('flyInSidebar', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateX(-50%)', opacity: 0 }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('flyInLinks', [
      transition('void => *', [
        group([
          query('.navigation-link', [
            style({ transform: 'translateX(-50%)', opacity: 0 }),
            stagger(30, [
              animate('100ms', style({opacity: 1, transform: 'translateY(0)'}))
            ])
          ])
        ])
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ]),

  ]

})
export class SidenavComponent implements OnInit {

  @Output()
  readonly sidebarOpened = new EventEmitter<boolean>();

  @Input()
  links: Link[];

  @Input()
  width = 200;

  public readonly title: string;
  isOpen = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  openMenu(): void {
    this.isOpen = true;
    this.sidebarOpened.emit(this.isOpen);
  }

  closeMenu(): void {
    this.isOpen = false;
    this.sidebarOpened.emit(this.isOpen);
  }

}
