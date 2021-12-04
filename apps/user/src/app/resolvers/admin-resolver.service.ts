import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {User} from "../../../../../libs/models/user";
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";

// we will use resolver to fetch the data befofr th navigation
//is complleted so it will intialize and prepare requires data to
// be displayes in the reqired componenet

@Injectable({
  providedIn: 'root'
})
export class AdminResolverService implements Resolve<User[]> {

  constructor(private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>|Promise<User>|any  {
    return this.authService.getSystemUsers();
  }

  
}