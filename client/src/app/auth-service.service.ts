import { Inject, Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { BROWSER_STORAGE } from './login/storage';
import { AuthResponse, User } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private apiDataService: ApiDataService,
  ) {
  }

  public getToken(): string | null {
    return this.storage.getItem('auth-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('auth-token', token);
  }

  public login(user: User): Promise<any> {
    return this.apiDataService.login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public logout(): void {
    this.storage.removeItem('auth-token');
  }
}
