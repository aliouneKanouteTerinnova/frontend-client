import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping-adress',
  templateUrl: './shipping-adress.component.html',
  styleUrls: ['./shipping-adress.component.scss'],
})
export class ShippingAdressComponent implements OnInit {
  shippingAdresses = [
    {
      fullName: 'Moussa Fall',
      adress: 'Hann Maariste II, villa Z40',
      city: 'Dakar',
      country: 'Senegal',
      zipCode: '12500',
    },
    {
      fullName: 'Astou Fall',
      adress: 'Pikine, villa 140',
      city: 'Dakar',
      country: 'Senegal',
      zipCode: '10000',
    },
    {
      fullName: 'Modou Diane',
      adress: 'Ouakam, villa 310',
      city: 'Dakar',
      country: 'Senegal',
      zipCode: '13000',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
