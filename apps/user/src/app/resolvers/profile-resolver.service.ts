import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Profile} from "../../../../../libs/models/profile";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth/auth.service";

// we will use resolver to fetch the data befofr th navigation
//is complleted so it will intialize and prepare requires data to
// be displayes in the reqired componenet

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<Profile> {

  constructor(private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> | any{
    return this.authService.getUserProfile();
  }
}