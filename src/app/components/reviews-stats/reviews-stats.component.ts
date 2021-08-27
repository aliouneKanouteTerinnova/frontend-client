import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reviews-stats',
  templateUrl: './reviews-stats.component.html',
  styleUrls: ['./reviews-stats.component.scss'],
})
export class ReviewsStatsComponent implements OnInit {
  @Input() reviews: any;
  ratings: number[] = [0, 0, 0, 0, 0];
  @Output() btnAddReviewClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.reviews.map((review) => {
      this.ratings[review.rating - 1]++;
    });
  }

  onClick() {
    this.btnAddReviewClick.emit();
  }
}
