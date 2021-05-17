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

    this.authService.getUser(this.currentUser.user.token).subscribe((data) => {
      const user: AuthResponded = data.body;
      this.registerForm.patchValue({
        username: user.user.username,
        email: user.user.username,
      });
    });
  }
  update() {}
}
