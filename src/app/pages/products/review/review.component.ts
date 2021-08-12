import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Review } from 'src/app/models/review/review';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { ReviewService } from 'src/app/services/review/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  createReviewForm: FormGroup;
  currentUser: any;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private route: Router,
    private authService: AuthenticationsService,
    public dialogRef: MatDialogRef<ReviewComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data;
    this.currentUser = this.authService.currentUserValue;
    this.createReviewForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      comment: [null, Validators.required],
      rating: [null, Validators.required],
    });
  }

  onSubmit() {
    const review = new Review();

    review.title = this.createReviewForm.get('title').value;
    review.comment = this.createReviewForm.get('comment').value;
    review.rating = this.createReviewForm.get('rating').value;
    review.product = this.id;

    this.reviewService.addReview(review, this.currentUser.user.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your review has been added',
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
