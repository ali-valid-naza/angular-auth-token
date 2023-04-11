export interface User {
  //todo types
  username: string | null | undefined;
  password: string | null | undefined;
}

export interface AuthResponse {
  token: string;
}

export interface CounterResponse {
  counterValue: number;
  nextValue?: number;
}
