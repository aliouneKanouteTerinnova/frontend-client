import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { ReviewItemComponent } from './review-item.component';

describe('ReviewItemComponent', () => {
  let component: ReviewItemComponent;
  let fixture: ComponentFixture<ReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a review as prop', () => {
    expect(component.review).toBeTruthy();
  });

  it('should get the current user', () => {
    expect(component.currentUser).toBeTruthy();
  });

  it('should emit an update review event', () => {
    component.btnUpdateReviewClick.pipe(first()).subscribe((value: string) => {
      expect(value).toBe('update review');
    });
    component.onReviewUpdate();
  });

  it('should emit an delete review event', () => {
    component.btnDeleteReviewClick.pipe(first()).subscribe((value: string) => {
      expect(value).toBe('delete review');
    });
    component.onReviewDelete();
  });
});
