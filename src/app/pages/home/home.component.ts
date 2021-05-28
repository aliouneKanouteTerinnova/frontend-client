import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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

  ngOnInit(): void {}
}
