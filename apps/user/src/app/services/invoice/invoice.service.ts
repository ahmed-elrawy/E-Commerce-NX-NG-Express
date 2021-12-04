import {Injectable} from '@angular/core';
import {ErrorHandler} from "../../../../../../libs/error-handler";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../../../../../../libs/models/invoice";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoiceUrl = `http://localhost:3000/invoices`;
  private errorHandler: ErrorHandler = new ErrorHandler();

  constructor(private http: HttpClient) {
  }

  getUserInvoice(id: number): Observable<Invoice>| undefined {
    try {
      return this.http.get<Invoice>(`${this.invoiceUrl}/${id}`);
    } catch (error: any) {
      this.errorHandler.handleError(error);
    }
  }
}