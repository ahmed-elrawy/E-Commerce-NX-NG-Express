import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../../../../../libs/models/cart';
import { CartItem } from '../../../../../../libs/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }


  private _cartUrl = `http://localhost:3000/cart`;
  private _cartItemUrl = `http://localhost:3000/cart_items`;
  private errorHandler: ErrorHandler = new ErrorHandler();


  getCart(id: number): Observable<Cart> | undefined | null {
    try{
      const urlById = `${this._cartUrl}/${id}`;
      return this.http.get<Cart>(urlById)
    }catch(e:any){
      this.errorHandler.handleError(e)
    }
     return null
  }

  getCartItem(cartItemId: number): Observable<Cart> | undefined | null {
    try{
      const clearUrl = `${this._cartItemUrl}/${cartItemId}/products/clear-products`;
      this.http.get<CartItem>(this._cartItemUrl)
    }catch(e:any){
      this.errorHandler.handleError(e)
    }
    return null
  }


  placOrder(cartItemId: number, productId: number,
    createOrderDto: any) :Observable<void> | undefined | null{
      try{
        const orderUrl = `${this._cartItemUrl}/${cartItemId}/products/${productId}/placeorder`;
        return this.http.post<void>(orderUrl,createOrderDto)
      }catch(err:any) {
        this.errorHandler.handleError(err)
      }
      return null
    }

    removeFromCart(cartItemId: number, productId: number):Observable<CartItem> | undefined | null {
      try{
        const removeUrl = `${this._cartItemUrl}/${cartItemId}/products/${productId}/remove-from-cart`;
       return this.http.delete<CartItem>(removeUrl);
      }catch(err: any){
        this.errorHandler.handleError(err);
      }
      return null
    }

    checkout(cartItemId: number, createOrderDto: any): Observable<void> | undefined | null {
      try {
        const checkoutUrl = `${this._cartItemUrl}/${cartItemId}/checkout`;
        return this.http.post<void>(checkoutUrl, createOrderDto);
      } catch (error) {
        this.errorHandler.handleError(error);
      }
      return null
    }
}


