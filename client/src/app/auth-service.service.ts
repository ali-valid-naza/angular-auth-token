import { Inject, Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { BROWSER_STORAGE } from './login/storage';
import { User } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private apiDataService: ApiDataService,
  ) { }

  public getToken(): string {
    return ''
  }

  public saveToken(token: string): void {
  }

  public login(user: User): Promise<any> {
    return new Promise<User>(user)
  }


  public logout(): void {
  }
}
