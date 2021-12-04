import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Order} from "../../../../../libs/models/order";
import {OrderService} from "../services/order/order.service";

// we will use resolver to fetch the data befofr th navigation
//is complleted so it will intialize and prepare requires data to
// be displayes in the reqired componenet

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<Order[]> {

  constructor(private orderService: OrderService) {
  }

  // for admin panel
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]> | any{
    return this.orderService.getOrders();
  }
}