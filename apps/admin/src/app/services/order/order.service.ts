import {Injectable} from '@angular/core';
import {ErrorHandler} from "../../../../../../libs/error-handler";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../../../../../../libs/models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private errorHandler: ErrorHandler = new ErrorHandler();
  private orderUrl = 'http://localhost:3000/orders/user-orders';

  constructor(private http: HttpClient) {
  }

  // for admin staff
  getOrders(): Observable<Order[]> | undefined {
    try {
      return this.http.get<Order[]>(this.orderUrl);
    } catch (error: any) {
      this.errorHandler.handleError(error);
    }
  }
  // for user staff
  getUserOrder(orderId: number): Observable<Order> | any { // change any to un define
    try {
      return this.http.get<Order>(`${this.orderUrl}/${orderId}`);
    } catch (error: any) {
      this.errorHandler.handleError(error);
    }
  }
}