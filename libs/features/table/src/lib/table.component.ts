import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public readonly links = [{
    href: './client',
    label: 'Client Side',
    icon: 'table'
  }, {
    href: './server',
    label: 'Server Side',
    icon: 'table'
  }];

  constructor() {

  }

  ngOnInit(): void {
  }

}
