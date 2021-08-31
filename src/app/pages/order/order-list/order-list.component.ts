import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  listOrders = [];
  currentUser: any;
  token: any;
  typeUser: any;
  isSeller = false;
  sellerOrderSubscription: Subscription;
  constructor(
    private orderService: OrderService,
    private i18nServiceService: I18nServiceService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser['user'].token;
    this.typeUser = this.currentUser['user'].account_type;
    if (this.typeUser === 'Seller') {
      this.isSeller = true;
      this.getSellerOrders();
    } else {
      this.getCustomerOrders();
    }
  }

  getCustomerOrders() {
    this.orderService.getAllOrders(this.token).subscribe(
      (data) => {
        this.listOrders = data.body;
        console.log(this.listOrders);
      },
      (error) => {}
    );
  }

  getSellerOrders() {
    this.orderService.getSellerOrders(this.token);
    this.sellerOrderSubscription = this.orderService.sellerOrdersSubject.subscribe((data) => {
      this.listOrders = data;
    });
    this.orderService.emitSellerOrders();
    // this.orderService.getAllOrdersFromSeller(this.token).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.listOrders = data.body;
    //   },
    //   (error) => {}
    // );
  }

  formatPrice(price: any) {
    var prices = price.split('.');
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      prices = price;
    } else {
      prices = prices[0] + ',' + prices[1];
      if (prices.split(',').length > 2) {
        prices = prices.split(',')[0] + '' + prices.split(',')[1] + ',' + prices.split(',')[2];
      }
    }
    return prices;
  }
}
