import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponded } from 'src/app/models/auth/auth';
import { CartModelServer } from 'src/app/models/cart/cart';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { CartService } from 'src/app/services/cart.service';
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
  constructor(
    public cartService: CartService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationsService,
    private router: Router
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
      cardname: [null, Validators.required],
      cardnumber: [null, Validators.required],
      expmonth: [null, Validators.required],
      expyear: [null, Validators.required],
      cvv: [null, Validators.required],
      sameadr: [false, Validators.required],
    });
    if (this.currentUser) {
      this.authService.getUser(this.currentUser['user'].token).subscribe((data) => {
        console.log(data.body);
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
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  checkout() {
    console.log(this.checkoutForm.value);
    if (!this.checkoutForm.valid) {
      return;
    }
    const commandeNum = this.getRandomInt(10000000, 19999999);
    this.cartService.deleteCart();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Commande ${commandeNum} has been successfully validated`,
      showConfirmButton: false,
      timer: 5000,
    });
    this.router.navigate(['/home']);
  }
}
