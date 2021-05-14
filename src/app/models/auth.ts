class AuthModel {
  email: string;
  password: string;
}

export class AuthUser {
  email: string;
  username: string;
  token: string;
}

export class Auth {
  user: AuthModel;
}
