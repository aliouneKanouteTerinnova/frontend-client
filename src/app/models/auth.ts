type AuthModel = {
  email: string;
  password: string;
};

export type AuthUser = {
  email: string;
  username: string;
  token: string;
};

export type Auth = {
  user: AuthModel;
};
