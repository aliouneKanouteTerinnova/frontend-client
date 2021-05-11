/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { AuthenticationsService } from 'src/app/services/authentications.service';

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

  constructor(private snackBar: MatSnackBar, private authService: AuthenticationsService) {}
  ngOnInit(): void {}
  register() {
    const username = this.remail.split('@')[0];
    const user: User = {
      user: {
        username: username,
        email: this.remail,
        password: this.rpassword,
      },
    };
    if (this.rpassword === this.rcpassword) {
      this.authService.register(user).subscribe((response) => {
        console.log(response);
        this.successMessage = 'User created ';
        this.rpassword = '';
        this.rcpassword = '';
        this.remail = '';
      });
    } else {
      this.errorMessage = 'An error occured';
    }
  }
}
