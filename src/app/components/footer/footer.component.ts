import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores/stores.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  stores = [];
  constructor(private storesService: StoresService) {}

  ngOnInit(): void {
    this.getStores();
  }
  getStores() {
    this.storesService.getAllStores().subscribe(
      (res) => {
        this.stores = res.results;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
