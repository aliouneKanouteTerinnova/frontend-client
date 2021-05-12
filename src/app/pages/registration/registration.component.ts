/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/models/user';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
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
  loginForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthenticationsService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
    translate.setDefaultLang('de');
    translate.use('de');
  }
  ngOnInit(): void {
    this.i18nService.localeEvent.subscribe((locale) => this.translate.use(locale));
    this.loginForm = this.formBuilder.group(
      {
        username: [null, Validators.required],
        email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        password2: [null, Validators.required],
        checked: false,
      },
      {
        validator: MustMatch('password', 'password2'),
      }
    );
  }
  register() {
    const username = this.loginForm.get('username').value;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const user: User = {
      user: {
        username: username,
        email: email,
        password: password,
      },
    };
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.register(user).subscribe((response) => {
      console.log(response);
      this.successMessage = 'User created ';
      this.rpassword = '';
      this.rcpassword = '';
      this.remail = '';
    });
  }
}
