import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address/address';
import { AuthResponded } from 'src/app/models/auth/auth';
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
  listGender = ['M', 'F', 'OTHERS'];
  gender = '';

  constructor(private authService: AuthenticationsService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser['user'].token);
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, Validators.required],
      gender: [null, Validators.required],
      state: [null, Validators.required],
      zipcode: [null, Validators.required],
      country: [null, Validators.required],
      street: [null, Validators.required],
    });

    this.authService.getUser(this.currentUser['user'].token).subscribe((data) => {
      console.log(data.body);
      const user: AuthResponded = data.body;
      this.registerForm.patchValue({
        username: user['user'].username,
        gender: user['user'].gender,
        state: user['user'].address.state,
        zipcode: user['user'].address.zipcode,
        country: user['user'].address.country,
        street: user['user'].address.street,
      });
    });
  }
  update() {
    const username = this.registerForm.get('username').value;
    const sexe = this.registerForm.get('gender').value;
    const state = this.registerForm.get('country').value;
    const zipcode = this.registerForm.get('zipcode').value;
    const country = this.registerForm.get('state').value;
    const street = this.registerForm.get('street').value;
    const address: Address = {
      state: state,
      zipcode: zipcode,
      country: country,
      street: street,
    };
    const user = {
      username: username,
      gender: sexe,
      address: address,
    };
    console.log(user);
    // this.authService.update(user, this.currentUser.token).subscribe(
    //   (data) => {
    //     this.successMessage = 'User updated successfully ';
    //     this.errorMessage = '';
    //   },
    //   (error) => {
    //     this.errorMessage = 'Username/Password not correct';
    //   }
    // );
  }
}
