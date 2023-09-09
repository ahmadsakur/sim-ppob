export type loginCredentialsType = {
  email: string;
  password: string;
};

export type registerCredentialsType = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type updateProfileType = {
  email?: string;
  first_name?: string;
  last_name?: string;
};
