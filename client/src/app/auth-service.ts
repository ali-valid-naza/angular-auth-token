import { Inject, Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { BROWSER_STORAGE } from './login/storage';
import { AuthResponse, User } from './types';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ɵElement,
  ɵFormGroupValue,
  ɵTypedOrUntyped
} from '@angular/forms';

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

  public login(user: User) {
    return this.apiDataService.login(user)
      .then((authResp: any) => this.saveToken(authResp.token));
  }

  public logout(): void {
    this.storage.removeItem('auth-token');
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
