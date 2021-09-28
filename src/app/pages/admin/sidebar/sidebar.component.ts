/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/sales-analytics', title: 'Sales analytics', icon: 'leaderboard', class: '' },
  { path: '/admin-products', title: 'Products', icon: 'ballot', class: '' },
  { path: '/admin-orders', title: 'Orders', icon: 'lock', class: '' },
  { path: '/admin-customers', title: 'Customers', icon: 'person', class: '' },
];

declare interface Tr {
  name: string;
  price: string;
  quantity: string;
  amount: string;
}
export const TBODY: Tr[] = [
  { name: 'CamMask', price: '€128.50', quantity: '5', amount: '€1,965.81' },
  { name: 'CaTam', price: '€128.50', quantity: '5', amount: '€1,965.81' },
  { name: 'Waxy', price: '€128.50', quantity: '5', amount: '€1,965.81' },
  { name: 'WaxCa', price: '€128.50', quantity: '5', amount: '€1,965.81' },
];

declare interface Th {
  title: string;
}
export const THEAD: Th[] = [{ title: 'Product' }, { title: 'Price' }, { title: 'Quantity' }, { title: 'Amount' }];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any[];
  thItems: any[];
  trItem: any[];
  title = 'Top Selling Product';
  welcome = 'Mr Test Test';
  infos = 'here are the informations we have on your shops';

  itemsP = 2332;
  itemsNameP = 'Pending orders';
  imgBgP = './../../../../assets/dashboard/Rectangle 6.svg';
  imgP = './../../../../assets/dashboard/Group.svg';

  itemsS = 4243;
  itemsNameS = 'Sold';
  imgBgS = './../../../../assets/dashboard/Rectangle 6 (1).svg';
  imgS = './../../../../assets/dashboard/Group (1).svg';

  itemsC = 23419;
  itemsNameC = 'Canceled';
  imgBgC = './../../../../assets/dashboard/Rectangle 6 (2).svg';
  imgC = './../../../../assets/dashboard/Group (2).svg';

  itemsN = 83457;
  itemsNameN = 'New clients';
  imgBgN = './../../../../assets/dashboard/Rectangle 6 (3).svg';
  imgN = './../../../../assets/dashboard/Group (3).svg';

  constructor(private router: Router, private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.thItems = THEAD.filter((thItem) => thItem);
    this.trItem = TBODY.filter((thItem) => thItem);
  }

  ngAfterViewInit(): void {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}
