import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponded } from 'src/app/models/auth';
import { AuthenticationsService } from 'src/app/services/authentications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  user: AuthResponded;

  constructor(private authService: AuthenticationsService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.authService.getUser(this.currentUser['user'].token).subscribe((data) => {
      console.log(data.body);
      this.user = data.body;
    });
  }
  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
