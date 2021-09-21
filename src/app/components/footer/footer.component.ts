/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsletterService } from 'src/app/services/newsletter/newsletter.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  stores = [];
  storesTemp = [];
  currentUser: any;
  newsletterForm: FormGroup;
  vaana;
  compte;

  constructor(
    private route: Router,
    private storesService: StoresService,
    private newsletterService: NewsletterService,
    private fb: FormBuilder,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.compte = [
      this.currentUser ? '' : { title: 'Sidentifier', link: '/register' },
      { title: 'Panier', link: '/cart' },
      { title: 'Commande', link: this.currentUser.user.account_type === 'Seller' ? '/orders-seller' : 'order' },
    ];

    this.getStores();
    this.newsletterForm = this.fb.group({
      email: [''],
    });
  }
  async getStores(): Promise<any> {
    const data = await this.storesService.getAllStores().toPromise();

    this.stores = data.results.slice(0, 5);
  }

  hideBtn() {
    if (this.stores && 0) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    const newsletter = this.newsletterForm.value.email;
    this.newsletterService.addEmail(newsletter).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your email has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.errors.email,
        });
      }
    );
    this.newsletterForm.reset();
  }
}
