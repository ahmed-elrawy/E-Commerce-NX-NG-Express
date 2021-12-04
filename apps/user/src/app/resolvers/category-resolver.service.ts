import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Category} from "../../../../../libs/models/category";
import {Observable} from "rxjs";
import { CategoryService } from '../services/category.service';
// we will use resolver to fetch the data befofr th navigation
//is complleted so it will intialize and prepare requires data to
// be displayes in the reqired componenet

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<Category[]>{

  constructor(private categoryService: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> | any {
    return this.categoryService.getCategories();
  }
}