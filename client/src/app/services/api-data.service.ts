import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from '../login/storage';
import { AuthResponse, CounterResponse, User } from '../types';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) {
  }

  private apiBaseUrl = 'http://localhost:3000/api/v1';

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User) {
    return this.makeAuthApiCall('login', user);
  }

  public doIncrement(counterValue: CounterResponse): Promise<any> {
    return this.makeApiIncrementCall('counter', counterValue);
  }

  private async makeAuthApiCall(urlPath: string, user: User)
    : Promise<any> {
    const url: string = `${ this.apiBaseUrl }/${ urlPath }`;

    return await lastValueFrom(this.http.post(url, user).pipe(take(1)), {defaultValue: {token: ''}})
      .then((response) => {
        console.log(response);
       return response as AuthResponse;
      })
      .catch(this.handleError);
  }

  private async makeApiIncrementCall(urlPath: string, counterValue: CounterResponse) {
    const url: string = `${ this.apiBaseUrl }/${ urlPath }`;
    return await firstValueFrom(this.http.post(url, counterValue).pipe(take(1)),)
      .then((response) => response)
      .catch(this.handleError);
  }
}
