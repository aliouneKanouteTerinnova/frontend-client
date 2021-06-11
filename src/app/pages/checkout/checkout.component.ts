import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      cardname: [null, Validators.required],
      cardnumber: [null, Validators.required],
      expmonth: [false, Validators.required],
      expyear: [null, Validators.required],
      cvv: [null, Validators.required],
      sameadr: [false, Validators.required],
    });
  }
  register() {
    console.log(this.checkoutForm.value);
  }
}
