import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { ActivatedRoute } from '@angular/router';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { User } from 'src/app/models/user/user';
import { Address } from 'src/app/models/address/address';
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable max-len */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signinForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  token: any;
  email: any;
  isActivated = false;
  resendLink = false;
  errorMessage: string;
  successMessage: string;

  constructor(
    private authService: AuthenticationsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.token) {
        this.email = params.email;
        this.token = params.token;
      } else {
        this.token = null;
      }
    });
  }

  ngOnInit(): void {
    if (this.token !== null) {
      this.authService.verifyToken(this.token, this.email).subscribe(
        (data) => {
          if (Number(data.code) === 200) {
            this.isActivated = true;
            this.successMessage = 'Account activated successfully, you can now log in';
          }
        },
        (error) => {
          this.resendLink = true;
          this.errorMessage = 'Token expired, could you register again';
        }
      );
    }

    this.signinForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', Validators.required],
        checked: [true, Validators.required],
      },
      {
        validator: MustMatch('password', 'password2'),
      }
    );
  }

  resend(): void {
    const email = {
      email: this.email,
    };
    this.authService.resend(email).subscribe(
      (data) => {
        if (data) {
          this.isActivated = true;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Check your mail to activate your account!',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
      (error) => {
        this.resendLink = true;
        this.errorMessage = 'An error occured';
      }
    );
  }

  signin(): void {
    const username = this.signinForm.get('username').value;
    const typeUser = 1;
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    const state = 'Test';
    const zipcode = 'Test';
    const country = 'Test';
    const street = 'Test';
    const gender = 2;
    const checked = this.signinForm.get('checked').value;
    const address: Address = {
      state: state,
      zipcode: zipcode,
      country: country,
      street: street,
    };
    const user: User = {
      email: email,
      username: username,
      account_type: typeUser,
      gender: gender,
      address: address,
      password: password,
    };

    console.log(user);

    this.authService.register(user).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Check your mail to activate your account!',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          // this.router.navigate(['/home']);
        });
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error,
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(error);
      }
    );
  }
}
