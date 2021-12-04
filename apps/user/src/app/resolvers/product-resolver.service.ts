import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Product} from "../../../../../libs/models/product";
import {ProductService} from "../services/product/product.service";

// we will use resolver to fetch the data befofr th navigation
//is complleted so it will intialize and prepare requires data to
// be displayes in the reqired componenet

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product[]> {

  constructor(private productService: ProductService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    return this.productService.getProducts();
  }
}