/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountType } from 'src/app/enums/account-type.enum';
import { AuthResponded } from 'src/app/models/auth/auth';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { Store } from '../../../models/store/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  user: AuthResponded;
  is_seller = false;

  constructor(
    private authService: AuthenticationsService,
    private router: Router,
    private storesService: StoresService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.authService.getUser(this.currentUser['user'].token).subscribe((data) => {
      this.user = data.body;
      if (this.currentUser['user'].account_type === 'SELLER' || this.currentUser['user'].account_type === 'Seller') {
        this.is_seller = true;
      }
    });
  }
  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
