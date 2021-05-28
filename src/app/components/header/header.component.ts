import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  slides = [
    { image: '../assets/img/header-1.jpg' },
    { image: './assets/img/header-2.jpg' },
    {
      image:
        'https://therichpost.com/wp-content/uploads/2020/10/Angular-10-Learning-Education-Center-Free-Template-1.png',
    },
    {
      image: 'https://therichpost.com/wp-content/uploads/2020/11/Reactjs-Easy-Shop-Free-Template-with-Source-Code.png',
    },
    {
      image: 'https://therichpost.com/wp-content/uploads/2021/02/angular-11-bootstrap-4.5-Ecommerce-Template-Free.png',
    },
  ];
  products = [
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

  constructor() {}

  ngOnInit() {}
}
