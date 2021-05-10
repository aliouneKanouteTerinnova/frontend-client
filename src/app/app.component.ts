import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthenticationsService } from './services/authentications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend-client';
  nombre = [1, 2, 3, 4, 4];
  constructor(private authService: AuthenticationsService) {}

  goRegister() {
    const user = {
      user: {
        username: 'AbdoulayeNd',
        email: 'abdoulaye.ndao12@xegit.com',
        password: 'Passer1234',
      },
    };
    // const user = new User();
    // user.username = 'Laye';
    // user.email = 'abdoulayendao12@gmail.com';
    // user.password = 'Passer123';
    this.authService.register(user).subscribe((response) => {
      console.log(response);
    });
  }

  login() {
    const user = {
      user: {
        // username: 'AbdoulayeNd',
        email: 'abdoulaye.ndao12@xegit.com',
        password: 'Passer1234',
      },
    };
    // const user = new User();
    // user.username = 'Laye';
    // user.email = 'abdoulayendao12@gmail.com';
    // user.password = 'Passer123';
    this.authService.login(user).subscribe((response) => {
      console.log(response);
    });
  }

  getUser() {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NCwiZXhwIjoxNjIwNzQzMTc0fQ.XS3PsHzHBhQ-LKwlsMTFvtWZJJtbZiB6W1siexnlH6I';
    this.authService.getUser(token).subscribe((response) => {
      console.log(response);
    });
  }
}
