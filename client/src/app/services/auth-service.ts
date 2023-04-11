import { Inject, Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { BROWSER_STORAGE } from '../login/storage';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private apiDataService: ApiDataService,
  ) {
  }

  public getToken(): string {
    return <string>this.storage.getItem('auth-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('auth-token', token);
  }

  public getUserName(): string {
    return <string>this.storage.getItem('username');
  }

  public saveUserName(username: string): void {
    this.storage.setItem('username', username);
  }

  public login(user: User) {
    return this.apiDataService.login(user)
      .then((authResp: any) => {
        this.saveToken(authResp.token);
        this.saveUserName(authResp.username);
      });
  }

  public logout(): void {
    this.storage.removeItem('auth-token');
    this.storage.removeItem('username');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }
}
