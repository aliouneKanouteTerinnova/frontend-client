import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  idOrder: any;
  currentUser: any;
  order: any;
  token: any;
  total = 0;
  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService,
    private i18nServiceService: I18nServiceService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser['user'].token;
    this.idOrder = this.router.snapshot.params.id;
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrder(this.idOrder, this.token).subscribe(
      (data) => {
        console.log(data.body);
        this.order = data.body;
        this.total = Number(this.order.total_tax) + Number(this.order.shipping_tax) + Number(this.order.total_prices);
      },
      (error) => {}
    );
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
