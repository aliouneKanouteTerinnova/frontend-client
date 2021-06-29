/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
import { PaymentsService } from './../../services/payments.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address/address';
import { AuthResponded } from 'src/app/models/auth/auth';
import { CartModelServer } from 'src/app/models/cart/cart';
import { Item } from 'src/app/models/item/item';
import { ShippingAddress } from 'src/app/models/shipping-address/shipping-address';
import { ShippingMethod } from 'src/app/models/shipping-method/shipping-method';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';
import { Stripe } from 'stripe-angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  testForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  currentUser: any;
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  idCart: any;
  stripe: any;
  card;
  token;
  pbKey;
  orderNumber;
  errorMessage: any;
  constructor(
    public cartService: CartService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationsService,
    private orderService: OrderService,
    private router: Router,
    private payment: PaymentsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });
    this.checkoutForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      cardname: '',
      cardnumber: '',
      expmonth: '',
      expyear: '',
      cvv: '',
      sameadr: '',
    });
    this.initForm('', '');
    if (this.currentUser) {
      this.authService.getUser(this.currentUser['user'].token).subscribe((data) => {
        const user: AuthResponded = data.body;
        this.checkoutForm.patchValue({
          firstname: user['user'].username,
          email: user['user'].email,
          state: user['user'].address.state,
          zip: user['user'].address.zipcode,
          country: user['user'].address.country,
          address: user['user'].address.street,
          city: user['user'].address.state,
        });
      });
    }
  }

  initForm(amount, orderNumber) {
    this.testForm = this.formBuilder.group({
      amount: ['Amount : ' + amount, Validators.required],
      orderNumber: ['Order number : ' + orderNumber, Validators.required],
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

    this.card.addEventListener('change', (event) => {
      if (event.error) {
        this.errorMessage = event.error.message;
      } else {
        this.errorMessage = '';
      }
    });
  }

  checkout() {
    const address = this.checkoutForm.get('address').value;
    const state = this.checkoutForm.get('state').value;
    const city = this.checkoutForm.get('city').value;
    const zip = this.checkoutForm.get('zip').value;
    if (!this.checkoutForm.valid) {
      return;
    }
    this.cartService.InitiateBasket(this.currentUser['user'].token).subscribe(
      (data) => {
        this.idCart = data.body.id;
        this.cartData.data.forEach((element) => {
          const item: Item = {
            product: element.product.id,
            quantity: element.numInCart,
          };
          this.cartService.addItemToCart(item, this.currentUser['user'].token).subscribe(
            (dataItem) => {},
            (error) => {}
          );
        });
        const addresse: Address = {
          country: state,
          state: city,
          street: address,
          zipcode: zip,
        };
        const shippingAddress: ShippingAddress = {
          phone_number: '781051173',
          notes: '',
          address: addresse,
        };
        const shippingMethod: ShippingMethod = {
          name: 'DHL',
          price: 10000,
          currency: 'EUR',
        };
        const order = {
          cart: this.idCart,
          currency: 'EUR',
          total_tax: 315,
          shipping_tax: 315,
          total_prices: this.cartTotal,
          shipping_address: shippingAddress,
          shipping_method: shippingMethod,
        };
        this.orderService.addOrder(order, this.currentUser['user'].token).subscribe(
          (data) => {
            console.log('oder created ', data);
            const sommes = +order.total_prices + +order.total_tax + +order.shipping_method.price;
            const param = {
              order_number: data.body.number,
              method: 'card',
              amount: sommes,
              currency: 'EUR',
            };
            this.payment.payment(param, this.currentUser['user'].token).subscribe(
              (res) => {
                this.pbKey = res.body.public_key;
                this.token = res.body.token;
                this.orderNumber = res.body.payment.order_number;
                // const method = res.body.payment.method;
                // const amount = res.body.payment.amount;
                this.stripe = Stripe(this.pbKey);

                this.initStripeForm();

                this.initForm(sommes, this.orderNumber);
                console.log(res);
              },
              (err) => {
                console.log(err);
              }
            );
            this.cartService.deleteCart();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Order has been successfully registrered, check your my to see confirmation`,
              showConfirmButton: false,
              timer: 5000,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (errors) => {}
    );
  }

  OnSubmit() {
    this.stripe
      .confirmCardPayment(`${this.token}`, {
        payment_method: {
          card: this.card,
        },
      })
      .then((result) => {
        console.log(result);
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
          const body = {
            order_number: this.orderNumber,
          };
          this.payment
            .confirmCardPayment(this.currentUser['user'].token, result.paymentIntent.id, body)
            .subscribe((res) => {
              this.router.navigate(['/orders']);
              console.log(res);
            });
        }
      });
  }
}
