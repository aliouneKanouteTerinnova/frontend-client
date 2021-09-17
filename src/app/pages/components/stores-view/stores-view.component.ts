/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { StoresViewService } from './stores-view.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stores-view',
  templateUrl: './stores-view.component.html',
  styleUrls: ['./stores-view.component.scss'],
})
export class StoresViewComponent implements OnInit {
  bestShop = [];
  title: string;
  carouselId: string;
  showSpinner = true;
  constructor(private storesViewService: StoresViewService) {}

  async ngOnInit(): Promise<void> {
    const res: any = await this.storesViewService.getAllStores().toPromise();
    if (res.results) {
      this.showSpinner = false;
    }
    this.bestShop = res.results;
    console.log(res.results);
  }
}
