import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review/review';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { ReviewService } from 'src/app/services/review/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css'],
})
export class UpdateReviewComponent implements OnInit {
  id: any;

  updateReviewForm = new FormGroup({
    title: new FormControl(''),
    comment: new FormControl(''),
    rating: new FormControl(''),
  });

  review: Review;
  currentUser: any;
  constructor(
    private reviewService: ReviewService,
    private authService: AuthenticationsService,
    public dialogRef: MatDialogRef<UpdateReviewComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data;
    this.currentUser = this.authService.currentUserValue;
    this.reviewService.getCurrentData(this.id).subscribe((res) => {
      this.updateReviewForm.patchValue({
        title: res.title,
        comment: res.comment,
        rating: res.rating,
      });
    });
  }

  onSubmit() {
    const review = {
      id: this.id,
      title: this.updateReviewForm.get('title').value,
      comment: this.updateReviewForm.get('comment').value,
      rating: this.updateReviewForm.get('rating').value,
    };

    this.reviewService.updateReview(this.id, review, this.currentUser.user.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Review modified',
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error,
        });
      }
    );
  }
}
