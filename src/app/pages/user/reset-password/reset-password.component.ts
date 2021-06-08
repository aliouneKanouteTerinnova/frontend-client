import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  resetPassForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  errorMessage: string;
  successMessage: string;
  errorResponse: any;
  isReset = false;
  token: any;
  uuid: any;

  constructor(
    private authService: AuthenticationsService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.router.snapshot.params.token;
    this.uuid = this.router.snapshot.params.uidb64;
    console.log(this.token);
    if (this.token && this.uuid) {
      this.isReset = true;
    }
    this.resetForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, Validators.required],
    });
    this.resetPassForm = this.formBuilder.group(
      {
        password: [null, [Validators.required, Validators.minLength(8)]],
        password2: [null, Validators.required],
      },
      {
        validator: MustMatch('password', 'password2'),
      }
    );
  }

  reset() {
    const mail = this.resetForm.get('email').value;
    const email = {
      email: mail,
    };
    this.authService.getEmailToResetPassword(email).subscribe(
      (data) => {
        console.log(data);
        // this.successMessage = 'User authenticated ';
      },
      (error) => {
        this.errorMessage = 'Username/Password not correct';
      }
    );
  }

  resetPass() {
    const password = this.resetForm.get('password').value;
    const value = {
      password: password,
      token: this.token,
      uidb64: this.uuid,
    };
    console.log(value);

    this.authService.resetPassword(value).subscribe(
      (data) => {
        console.log(data);
        // this.successMessage = 'User authenticated ';
      },
      (error) => {
        this.errorMessage = 'Username/Password not correct';
      }
    );
  }
}
