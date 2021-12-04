import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authServise: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.authServise.isLoggedIn() && this.authServise.currntUser.isAdmin){
      return true
    } else {
      this.router.navigate(['/auth/login'], {
        queryParams: {returnUrl: state.url}
      });
      return false
    }
  }
  
}
