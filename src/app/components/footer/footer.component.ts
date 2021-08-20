import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores/stores.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  stores = [];
  storesTemp = [];
  currentUser: any;
  vaana = [
    { title: 'Accueil', link: '/' },
    { title: 'A propos', link: '/apropos' },
    { title: 'Vision', link: '/vision' },
    { title: 'Mission', link: '/mission' },
    { title: 'Blog', link: '/blog' },
    { title: 'Contact', link: '/contact' },
  ];
  compte = [
    { title: 'Sidentifier', link: '/register' },
    { title: 'Achats', link: '/' },
    { title: 'Panier', link: '/cart' },
    { title: 'Commande', link: '/order' },
    { title: 'Remises', link: '/' },
    { title: 'Questions', link: '/' },
  ];
  // hideBtn;
  constructor(private storesService: StoresService) {}

  ngOnInit(): void {
    this.getStores();
  }
  getStores() {
    this.storesService.getAllStores().subscribe(
      (res) => {
        this.stores = res.results;
        this.storesTemp = this.stores.slice(0, 5);
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
