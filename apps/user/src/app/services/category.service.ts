import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ErrorHandler } from '../../../../../libs/error-handler';
import { Category } from '../../../../../libs/models/category';
import { Product } from '../../../../../libs/models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = `http://localhost:3000/categories`;

  constructor(private http: HttpClient) {
  }

  private errorHandler: ErrorHandler = new ErrorHandler();

  getCategories(): Observable<Category[]> | undefined | null{
    try {
      return this.http.get<Category[]>(this.categoryUrl);
    } catch (error: any) {
      this.errorHandler.handleError(error);
    }
    return null 
  }

  getCategoryById(id: number): Observable<Category> | undefined | null{
    try {
      const urlOfCategory = `${this.categoryUrl}/${id}`;
      return this.http.get<Category>(urlOfCategory);
    } catch (error: any) {
      this.errorHandler.handleError(error);
    }
    return null
  }

  createCategory(createCategoryDto: any): Observable<Category>| undefined | null{
    try {
      return this.http.post<Category>(this.categoryUrl, createCategoryDto);
    } catch (err: any) {
      this.errorHandler.handleError(err);
    }
    return null
  }

  updateCategory(categoryId: number, updateCategoryDto : Category): Observable<void>| undefined |  null{
    try {
      const urlById = `${this.categoryUrl}/${categoryId}`;
      return this.http.put<void>(urlById, updateCategoryDto);
    } catch (err: any) {
      this.errorHandler.handleError(err);
    }
    return null
  }
  updateProduct(
    categoryId: number,
    productId: number,
    updateProductDto: any
  ): Observable<void> | undefined | null{
    try {
      const urlById = `${this.categoryUrl}/${categoryId}/products/${productId}`;
      return this.http.put<void>(urlById, updateProductDto);
    } catch (err: any) {
      this.errorHandler.handleError(err);
    }
    return null
  }

  deleteCategory(categoryId: number): Observable<any> | undefined | null {
    try {
      const urlOfCategory = `${this.categoryUrl}/${categoryId}`;
      return this.http.delete<void>(urlOfCategory);
    } catch (error: any) {
      this.errorHandler.handleError(error);
    }
    return null
  }

  getCategoryProducts(id: number): Observable<Product[]> | undefined | null{
    try {
      return this.http.get<Product[]>(`${this.categoryUrl}/products`);
    } catch (error:any) {
      this.errorHandler.handleError(error);
    }
    return null
  }

  deleteProduct(categoryId: number, productId: number) {
    try {
      const urlById = `${this.categoryUrl}/${categoryId}/products/${productId}`;
      return this.http.delete<void>(urlById);
    } catch (err: any) {
      this.errorHandler.handleError(err);
    }
    return null
  }

  addProduct(categoryId: number, createProductDto: any): Observable<void> | undefined | null{
    try {
      const urlById = `${this.categoryUrl}/${categoryId}/products`;
      return this.http.post<void>(urlById, createProductDto);
    } catch (err:any) {
      this.errorHandler.handleError(err);
    }
    return null
  }
}