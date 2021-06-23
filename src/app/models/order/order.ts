import { CartModelServer } from '../cart/cart';
import { ShippingAddress } from '../shipping-address/shipping-address';
import { User } from '../user/user';

export class Order {
  'number': string;
  'cart': CartModelServer;
  'user': User;
  'currency': string;
  'total_tax': string;
  'shipping_tax': string;
  'total_prices': string;
  'shipping_address': ShippingAddress;
  'shipping_method': string;
}
