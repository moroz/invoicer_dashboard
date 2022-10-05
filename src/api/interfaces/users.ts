export interface User {
  id: string;
  email: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  passwordConfirmation: string;
}
