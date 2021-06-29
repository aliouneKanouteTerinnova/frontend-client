import { Component, OnInit } from '@angular/core';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
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
  constructor(private orderService: OrderService, private authService: AuthenticationsService) {}

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
      },
      (error) => {}
    );
  }

  getSellerOrders() {
    this.orderService.getAllOrdersFromSeller(this.token).subscribe(
      (data) => {
        this.listOrders = data.body;
      },
      (error) => {}
    );
  }
}
