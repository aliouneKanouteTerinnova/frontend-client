import { Address } from '../address/address';
import { User } from '../user/user';

export type ShippingAddress = {
  // phone_number: String;
  // notes: String;
  // address: Address;
  id: string;
  company: string;
  name: string;
  state: string;
  street1: string;
  city: string;
  zip_code: string;
  country: string;
  phone: string;
  email: string;
};
