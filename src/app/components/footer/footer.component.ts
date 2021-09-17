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
  vaana = [
    { title: 'Accueil', link: '/' },
    { title: 'A propos', link: '/apropos' },
    { title: 'Vision', link: '/vision' },
    { title: 'Mission', link: '/mission' },
    { title: 'Blog', link: '/blog' },
    { title: 'Contact', link: '/contact' },
  ];
  compte = [
    { title: 'Sidentifier', link: '/register' },
    { title: 'Achats', link: '/' },
    { title: 'Panier', link: '/cart' },
    { title: 'Commande', link: '/order' },
    { title: 'Remises', link: '/' },
    { title: 'Questions', link: '/' },
  ];
  // hideBtn;
  constructor(
    private route: Router,
    private storesService: StoresService,
    private newsletterService: NewsletterService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getStores();
    this.newsletterForm = this.fb.group({
      email: [''],
    });
  }
  getStores() {
    this.storesService.getAllStores().subscribe(
      (res) => {
        this.stores = res.results;
        this.storesTemp = this.stores.slice(0, 5);
      },
      (error) => {
        console.log(error);
      }
    );
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
