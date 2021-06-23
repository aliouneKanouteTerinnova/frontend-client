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
  constructor(private orderService: OrderService, private authService: AuthenticationsService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.orderService.getAllOrders(this.currentUser['user'].token).subscribe(
      (data) => {
        this.listOrders = data.body;
        console.log(this.listOrders);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
