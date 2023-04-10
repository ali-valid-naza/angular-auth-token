export interface User {
  username: string | null | undefined;
  password: string | null | undefined;
}

export interface AuthResponse {
  token: string;
}

export interface CounterResponse {
  counterValue: number;
}

// export class AuthResponse {
//   token: string;
// }
