import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-reviews-stats',
  templateUrl: './reviews-stats.component.html',
  styleUrls: ['./reviews-stats.component.scss'],
})
export class ReviewsStatsComponent implements OnInit {
  @Input() reviews: any;
  ratings: number[] = [0, 0, 0, 0, 0];
  @Output() btnAddReviewClick = new EventEmitter();

  hasOrdered = false;
  listOrders = [];
  listOrder = [];
  currentUser: any;
  token: any;
  showSpinner = true;
  idProduct: any;
  typeUser: any;
  isSeller = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthenticationsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.params.id;
    console.dir(this.idProduct);
    this.reviews.map((review) => {
      this.ratings[review.rating - 1]++;
    });
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser.token || this.currentUser['user'].token;
    this.getOrderedProducts();
  }

  onClick() {
    this.btnAddReviewClick.emit('add review');
  }

  getOrderedProducts() {
    this.orderService.getAllOrders(this.token).subscribe(
      (data) => {
        console.dir(data.body);
        this.listOrders = data.body;
        this.listOrders.forEach((order) => {
          order.order_items.forEach((items) => {
            this.listOrder.push(items);
            this.listOrder.forEach((item) => {
              if (item.cart_item['product'] == this.idProduct) {
                console.dir(item.cart_item['product']);
                this.hasOrdered = true;
              }
            });
          });
        });
        console.dir(this.listOrder);

        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getOrderedStores() {
    this.orderService.getAllOrders(this.token).subscribe(
      (data) => {
        console.dir(data.body);
        this.listOrders = data.body;
        this.listOrders.forEach((order) => {
          order.order_items.forEach((items) => {
            this.listOrder.push(items);
            this.listOrder.forEach((item) => {
              if (item.cart_item['product'] == this.idProduct) {
                console.dir(item.cart_item['product']);
                this.hasOrdered = true;
              }
            });
          });
        });
        console.dir(this.listOrder);

        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
