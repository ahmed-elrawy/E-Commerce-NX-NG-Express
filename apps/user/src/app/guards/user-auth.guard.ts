import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private authServce: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     if(this.authServce.isLoggedIn() && this.authServce.currntUser) {
       return true
     }else {
       this.router.navigate(['/auth/login'], {
         queryParams: {returnUrl: state.url}
       });
       return false
     }
  }
  
}
