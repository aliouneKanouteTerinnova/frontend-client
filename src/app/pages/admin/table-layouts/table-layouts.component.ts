import { Component, OnInit } from '@angular/core';

declare interface Th {
  title: string;
}
export const THEAD: Th[] = [{ title: 'Product' }, { title: 'Price' }, { title: 'Quantity' }, { title: 'Amount' }];

@Component({
  selector: 'app-table-layouts',
  templateUrl: './table-layouts.component.html',
  styleUrls: ['./table-layouts.component.scss'],
})
export class TableLayoutsComponent implements OnInit {
  thItems: any[];
  constructor() {}

  ngOnInit(): void {
    this.thItems = THEAD.filter((thItem) => thItem);
  }
}
