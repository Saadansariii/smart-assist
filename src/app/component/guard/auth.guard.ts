// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) { }
  
  
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       const token = localStorage.getItem('token');
//       console.log(token)
//       if (!token) {
//         this.router.navigate(['../']);
//         return false;
//       }
//     return true;
//   }
  
// }


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth(state.url, route.data['roles']);
  }

  private checkAuth(url: string, requiredRoles?: string[]): boolean | UrlTree {
    const token = sessionStorage.getItem('token');

    if (!token) {
      this.handleUnauthenticated(url, 'no-token');
      return false;
    }

    try {
      // Decode and validate token
      const tokenData = this.decodeToken(token);
      const isExpired = tokenData.exp * 1000 < Date.now();

      if (isExpired) {
        sessionStorage.removeItem('token');
        this.handleUnauthenticated(url, 'expired');
        return false;
      }

      // Role-based authorization
      if (requiredRoles && !this.checkRoles(tokenData.roles, requiredRoles)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      sessionStorage.removeItem('token');
      this.handleUnauthenticated(url, 'invalid');
      return false;
    }
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  private checkRoles(userRoles: string[], requiredRoles: string[]): boolean {
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  private handleUnauthenticated(url: string, reason: string): void {
    sessionStorage.setItem('redirectUrl', url);
    this.router.navigate(['/login'], { queryParams: { returnUrl: url, reason } });
  }
}
