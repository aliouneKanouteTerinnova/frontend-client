import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  listOrder: any;
  currentUser: any;
  token: any;
  showSpinner = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.reviews.map((review) => {
      this.ratings[review.rating - 1]++;
    });
    this.getCustomerOrders();
  }

  onClick() {
    this.btnAddReviewClick.emit('add review');
  }

  getCustomerOrders() {
    this.orderService.getAllOrders(this.token).subscribe(
      (data) => {
        console.log(data.body);
        this.listOrders = data.body;
        this.listOrder = this.listOrders;
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
