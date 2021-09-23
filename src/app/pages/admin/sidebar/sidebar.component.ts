/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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
  { path: '/products', title: 'Products', icon: 'ballot', class: '' },
  { path: '/orders', title: 'Orders', icon: 'lock', class: '' },
  { path: '/customers', title: 'Customers', icon: 'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any[];

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

  constructor(private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
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
