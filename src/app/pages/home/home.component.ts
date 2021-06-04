import { Component, OnInit } from '@angular/core';
import { AuthResponded } from 'src/app/models/auth';
import { AuthenticationsService } from 'src/app/services/authentications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products = [
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
  ];
  bestSelling = [
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
  ];
  goodStuff = [
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/17/58424/1.jpg?6353',
      name: 'Generic Tensiomètre LCD numérique pour tensiomètre-blanc',
      price: '30 442 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
    {
      src: 'https://sn.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/50/34406/1.jpg?9854',
      name: 'TOPICREM Ultra-Hydratant Gel 1L + Rasoir Gillette',
      price: '20 000 FCFA',
    },
  ];
  allCountries = ['EUROPE', 'AFRIQUE', 'ASIE', 'AMERIQUE', 'OCEANIE', 'OTHERS'];
  countries = [];
  left = false;
  right = true;
  firstIndex = 0;
  currentUser: AuthResponded;

  constructor(private authService: AuthenticationsService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser);
    this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
    this.firstIndex = this.firstIndex + 1;
  }
  handleLeftClick() {
    if (this.firstIndex > 0) {
      this.left = true;
      this.right = true;
      this.firstIndex = this.firstIndex - 1;
      this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
    }
    if (this.firstIndex <= 0) {
      this.firstIndex = 1;
      this.left = false;
      this.right = true;
    }
  }
  handleRightClick() {
    if (this.allCountries.length - this.firstIndex >= 3) {
      if (this.left && this.right) {
        this.firstIndex = this.firstIndex + 1;
        this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
      } else {
        this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
        this.firstIndex = this.firstIndex + 1;
      }
      this.left = true;
      this.right = true;

      if (this.allCountries.length - this.firstIndex <= 3) {
        this.firstIndex = this.allCountries.length - 3;
        this.left = true;
        this.right = false;
      }
    }
  }
}
