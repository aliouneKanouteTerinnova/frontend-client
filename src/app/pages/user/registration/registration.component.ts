/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { Auth, AuthResponded } from 'src/app/models/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountType } from 'src/app/enums/account-type.enum';
import { Gender } from 'src/app/enums/gender.enum';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  remail: string;
  rpassword: string;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  rcpassword: string;
  errorMessage: string;
  successMessage: string;
  errorResponse: any;
  loginForm: FormGroup;
  registerForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  userResponded: AuthResponded;
  isConnection = true;
  isInscription = false;
  listType = ['SELLER', 'CUSTOMER'];
  listGender = ['M', 'F', 'OTHERS'];
  token: any;
  email: any;
  isActivated = false;
  resendLink = false;

  constructor(
    private authService: AuthenticationsService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private i18nService: I18nServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.token) {
        console.log(params);
        this.email = params.email;
        this.token = params.token;
      } else {
        this.token = null;
      }
    });
    // translate.setDefaultLang('de');
    // translate.use('de');
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
          console.log(error);
          this.resendLink = true;
          this.errorMessage = 'Token expired, could you register again';
        }
      );
    }
    this.i18nService.localeEvent.subscribe((locale) => this.translate.use(locale));
    this.registerForm = this.formBuilder.group(
      {
        username: [null, Validators.required],
        email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
        typeUser: [null, Validators.required],
        gender: [null, Validators.required],
        address: [null, Validators.required],
        password: [null, [Validators.required, Validators.minLength(8)]],
        password2: [null, Validators.required],
        checked: [false, Validators.required],
      },
      {
        validator: MustMatch('password', 'password2'),
      }
    );
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, Validators.required],
    });
  }

  connexion() {
    this.isConnection = true;
    this.isInscription = false;
  }
  resend() {
    const email = {
      email: this.email,
    };
    console.log(email);
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
        console.log(error);
        this.resendLink = true;
        this.errorMessage = 'An error occured';
      }
    );
  }

  inscription() {
    this.isConnection = false;
    this.isInscription = true;
  }

  register() {
    const username = this.registerForm.get('username').value;
    const typeUser = this.registerForm.get('typeUser').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const address = this.registerForm.get('address').value;
    const gender = this.registerForm.get('gender').value;
    const user: User = {
      email: email,
      username: username,
      account_type: typeUser,
      gender: gender,
      address: address,
      password: password,
    };
    if (!this.registerForm.valid) {
      return;
    }
    this.authService.register(user).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Check your mail to activate your account!',
          showConfirmButton: false,
          timer: 2000,
        });
        this.rpassword = '';
        this.rcpassword = '';
        this.remail = '';
      },
      (error) => {
        if (error.error.errors.email) {
          this.errorMessage = error.error.errors.email;
        } else {
          if (error.error.errors.username) {
            this.errorMessage = error.error.errors.username;
          }
        }
      }
    );
  }
  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const user: Auth = {
      email: email,
      password: password,
    };
    this.authService.login(user).subscribe(
      (data) => {
        this.userResponded = data;
        this.router.navigate(['home']);
        this.successMessage = 'User authenticated ';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error.errors.error;
      }
    );
  }
}
