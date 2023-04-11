export interface User {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface CounterResponse {
  counterValue: number;
  nextValue?: number;
}
