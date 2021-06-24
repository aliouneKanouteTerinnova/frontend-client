/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stripe } from 'stripe-angular';
import Swal from 'sweetalert2';
import { PaymentsService } from './../../services/payments.service';
import { OrderService } from './../../services/order/order.service';
import { Order } from 'src/app/models/order/order';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  testForm: FormGroup;
  errorMessage: String;
  stripe = Stripe(
    'pk_test_51HQ3ZXFunRLoLWctiy0l6VVOeflU8ES2IRjTyY7LL9rEpKedBIfOfKB1BSSftQk4Qmke8HdtRcdmje7R2whuWgTz00U7HXpwjn'
  );
  amount = '120.00 EUR';
  orderNumber = 'OR251JSB';
  token = 'pi_1J5T6sFunRLoLWcttWP8lkh9_secret_1xs9KCX0jKuFVtGP0nh6N2A0V';
  card;
  order: Order;
  currentUser;
  constructor(
    private formBuilder: FormBuilder,
    private payment: PaymentsService,
    private orderService: OrderService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser);
    this.initForm();
    this.initStripeForm();
    // this.initOrder();
  }

  // initOrder() {
  //   this.orderService.addOrder(this.order, this.currentUser['user'].token).subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  initForm() {
    this.testForm = this.formBuilder.group({
      amount: ['Amount : ' + this.amount, Validators.required],
      orderNumber: ['Order number : ' + this.orderNumber, Validators.required],
    });
  }

  initStripeForm() {
    const elements = this.stripe.elements();
    // eslint-disable-next-line no-var
    const style = {
      style: {
        base: {
          fontFamily: 'Arial, sans-serif',
          fontSize: '30px',
          color: '#C1C7CD',
        },
        invalid: { color: 'red' },
      },
    };
    this.card = elements.create('card', style);

    this.card.mount('#card-element');

    this.card.addEventListener('change', function (event) {
      if (event.error) {
        this.errorMessage = event.error.message;
      } else {
        this.errorMessage = '';
      }
    });
  }

  OnSubmit() {
    this.stripe
      .confirmCardPayment(`${this.token}`, {
        payment_method: {
          card: this.card,
        },
      })
      .then((result) => {
        if (result.error) {
          this.errorMessage = result.error.message;
        } else if (result.paymentIntent.status === 'succeeded') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'payment has been made',
            showConfirmButton: false,
            timer: 1500,
          });
          // console.log(result.paymentIntent);
        }
      });
  }
}
