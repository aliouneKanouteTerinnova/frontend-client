import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
})
export class ReviewItemComponent implements OnInit {
  @Input() review: any;
  currentUser: any;
  @Output() btnDeleteReviewClick = new EventEmitter();
  @Output() btnUpdateReviewClick = new EventEmitter();

  constructor(private authService: AuthenticationsService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  onReviewUpdate() {
    this.btnUpdateReviewClick.emit();
  }

  onReviewDelete() {
    this.btnDeleteReviewClick.emit();
  }
}
