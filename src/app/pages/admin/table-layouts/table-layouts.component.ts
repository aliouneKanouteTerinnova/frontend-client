/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-layouts',
  templateUrl: './table-layouts.component.html',
  styleUrls: ['./table-layouts.component.scss'],
})
export class TableLayoutsComponent implements OnInit {
  @Input() thItems: any[];
  @Input() title;
  @Input() trItems: any[];
  constructor() {}

  ngOnInit(): void {
    // this.trItems = TBODY.filter((thItem) => thItem);
  }
}
