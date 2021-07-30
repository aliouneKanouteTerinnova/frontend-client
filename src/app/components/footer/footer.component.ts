import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores/stores.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  stores = [];
  // hideBtn;
  constructor(private storesService: StoresService) {}

  ngOnInit(): void {
    this.getStores();
  }
  getStores() {
    this.storesService.getAllStores().subscribe(
      (res) => {
        this.stores = res.results.slice(0, 5);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  hideBtn() {
    if (this.stores && 0) {
      return false;
    } else {
      return true;
    }
  }
}
