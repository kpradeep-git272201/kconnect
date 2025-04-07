import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Token present, allow access
      return true;
    } else {
      // No token, redirect to login
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
