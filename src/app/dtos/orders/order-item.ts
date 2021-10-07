import { ShippingAddress } from 'src/app/models/shipping-address/shipping-address';

export class OrderItem {
  id?: string | undefined;
  number: Number;
  shipping_address: ShippingAddress;
  shipping_tax: Number;
  total_prices: Number;
  payment_method: any;
  seller: any;
  cart_item: any;
  status: any;
  shipment: any;
}
