/* eslint-disable @typescript-eslint/naming-convention */

import { AccountType } from '../enums/account-type.enum';
import { Gender } from '../enums/gender.enum';

export type Token = {
  refresh: string;
  access: string;
};

export type Auth = {
  email: string;
  password: string;
};

export type AuthResponded = {
  email: string;
  username: string;
  token: string;
  account_type: AccountType;
  gender: Gender;
  address: string;
};

export type RegisterResponded = {
  email: string;
  username: string;
  token: string;
  is_verified: boolean;
  account_type: AccountType;
  gender: Gender;
  address: string;
  tokens: Token;
};
