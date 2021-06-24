import { PaymentsService } from './../../services/payments.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponded } from 'src/app/models/auth/auth';
import { CartModelServer } from 'src/app/models/cart/cart';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  currentUser: any;
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  idCart: any;
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
    // this.cartService.getCart(this.currentUser['user'].token).subscribe(
    //   (data) => {
    //     this.idCart = data.body.id;
    //     console.log(data.body.id);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    this.checkoutForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      cardname: [null, Validators.required],
      cardnumber: '',
      expmonth: '',
      expyear: '',
      cvv: '',
      sameadr: '',
    });
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
          cardname: '315',
          cardnumber: '315',
          expmonth: 'DHL',
          expyear: '10000',
          cvv: 'EURO',
        });
      });
    }
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
        console.log(data);
        this.cartData.data.forEach((element) => {
          const item = {
            product: element.product.id,
            quantity: element.numInCart,
          };
          console.log(item);
          this.cartService.addItemToCart(item, this.currentUser['user'].token).subscribe(
            (dataItem) => {
              console.log(dataItem);
            },
            (error) => {
              console.log(error);
            }
          );
        });
        const order = {
          cart: this.idCart,
          currency: 'EUR',
          total_tax: 315,
          shipping_tax: 315,
          total_prices: this.cartTotal,
          shipping_address: {
            phone_number: '781051173',
            notes: '',
            address: {
              country: state,
              state: city,
              street: address,
              zipcode: zip,
            },
          },
          shipping_method: {
            name: 'DHL',
            price: 10000,
            currency: 'EUR',
          },
        };
        this.orderService.addOrder(order, this.currentUser['user'].token).subscribe(
          (data) => {
            console.log('oder created ', data);
            const sommes = +order.total_prices + +order.total_tax + +order.shipping_method.price;
            const param = {
              order_number: data.body.number,
              method: 'card',
              amount: sommes,
            };
            this.payment.payment(param, this.currentUser['user'].token).subscribe(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log(err);
              }
            );
            // data.body.number
            // this.cartService.deleteCart();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Order has been successfully registrered, check your my to see confirmation`,
              showConfirmButton: false,
              timer: 5000,
            });
            // this.router.navigate(['/orders']);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (errors) => {
        console.log(errors);
      }
    );
    // console.log(this.checkoutForm.value);
  }
}
