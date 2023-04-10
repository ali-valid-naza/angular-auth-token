import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BROWSER_STORAGE } from './login/storage';
import { AuthResponse, User } from './types';
import { firstValueFrom, throwError, lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {
  }

  private apiBaseUrl = 'http://localhost:3000/api/v1';

  // private handleError(error: any): Promise<any> {
  //   console.error('Something has gone wrong', error);
  //   return Promise.reject(error.message || error);
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${ error.status }, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public login(user: User) {
    return this.makeAuthApiCall('login', user);
  }

  private async makeAuthApiCall(urlPath: string, user: User)
    : Promise<unknown>
  {
    const url: string = `${ this.apiBaseUrl }/${ urlPath }`;
    // return this.http
    //   .post<User>(url, user)
    //   .pipe(
    //     catchError((e) => this.handleError(e))
    //   )

    const value = this.http.post(url, user);

    return await lastValueFrom(this.http.post(url, user).pipe(take(1)), {defaultValue: {token: ''}})
      .then((response) => response as AuthResponse)
      .catch(this.handleError);



    // return promisePostUserData;


    // return this.http
    //   .post(url, user)
    //   .toPromise()
    //   .then(response => response as AuthResponse)
    //   .catch(this.handleError);
  }
}
