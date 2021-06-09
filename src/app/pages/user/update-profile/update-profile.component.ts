import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponded } from 'src/app/models/auth';
import { AuthenticationsService } from 'src/app/services/authentications.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  errorMessage: string;
  successMessage: string = '';
  registerForm: FormGroup;
  currentUser: any;

  constructor(private authService: AuthenticationsService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });

    this.authService.getUser(this.currentUser.token).subscribe((data) => {
      const user: AuthResponded = data.body;
      this.registerForm.patchValue({
        username: user.username,
        email: user.email,
      });
    });
  }
  update() {
    const username = this.registerForm.get('username').value;
    const email = this.registerForm.get('email').value;
    const user = {
      username: username,
      email: email,
    };
    this.authService.update(user, this.currentUser.token).subscribe(
      (data) => {
        this.successMessage = 'User updated successfully ';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Username/Password not correct';
      }
    );
  }
}
