import { Component, OnInit } from '@angular/core';

declare interface Th {
  title: string;
}
export const THEAD: Th[] = [{ title: 'Product' }, { title: 'Category' }, { title: 'Availablity' }, { title: 'Total' }];

declare interface Tr {
  image: string;
  name: string;
  price: string;
  quantity: string;
  amount: string;
}
export const TBODY: Tr[] = [
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'CamerMask',
    price: 'Art',
    quantity: '2/2 channels',
    amount: '€2000',
  },
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'Tata Lisa',
    price: 'Clothing',
    quantity: '2/2 channels',
    amount: '€2000',
  },
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'Meet',
    price: 'Food',
    quantity: '2/2 channels',
    amount: '€2000',
  },
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'CamerBrush',
    price: 'Art',
    quantity: '2/2 channels',
    amount: '€2000',
  },
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'MamaLisa',
    price: 'Art',
    quantity: 'Out of Stocks',
    amount: '€2000',
  },
];

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  thItem: any[];
  trItem: any[];
  title;
  constructor() {}

  ngOnInit(): void {
    this.thItem = THEAD.filter((thItem) => thItem);
    this.trItem = TBODY.filter((thItem) => thItem);
  }
}
