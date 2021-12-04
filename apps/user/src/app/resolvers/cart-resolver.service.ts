import {Injectable} from '@angular/core';
import {Cart} from "../../../../../libs/models/cart";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {CartService} from "../services/cart/cart.service";
import {AuthService} from "../services/auth/auth.service";


// we will use resolver to fetch the data befofr th navigation
//is complleted so it will intialize and prepare requires data to
// be displayes in the reqired componenet
@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<Cart> {

  constructor(private cartService: CartService, private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cart> | any {
    if (this.authService.profile) {
      return this.cartService.getCart(this.authService.profile.cartId);
    }
  }
}