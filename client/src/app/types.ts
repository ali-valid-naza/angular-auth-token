export interface User {
  username: string | null | undefined;
  password: string | null | undefined;
}

export interface AuthResponse {
  token: string;
}

// export class AuthResponse {
//   token: string;
// }
