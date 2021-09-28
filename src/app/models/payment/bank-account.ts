import { User } from '../user/user';

export class BankAccount {
  id: string;
  object_id;
  company: string;
  name: string;
  state: string;
  street1: string;
  city: string;
  zip_code: string;
  country: string;
  phone: string;
  email: string;
  user: User;
}
