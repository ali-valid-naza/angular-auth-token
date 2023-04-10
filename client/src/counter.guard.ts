import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './app/auth-service';

export const canActivateCounter: CanActivateFn =  () => inject(AuthService).isLoggedIn();
