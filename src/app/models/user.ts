/* eslint-disable @typescript-eslint/naming-convention */
import { AccountType } from '../enums/account-type.enum';
import { Gender } from '../enums/gender.enum';

export type User = {
  email: string;
  username: string;
  account_type: AccountType;
  gender: Gender;
  address: string;
  password: string;
};
