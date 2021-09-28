import { Address } from '../address/address';

export class Store {
  name: string;
  // created_at: string;
  created_by: number;
  // store_address: string;
  address: Address;
  is_active: boolean;
  products: any;
  image: string;
}
