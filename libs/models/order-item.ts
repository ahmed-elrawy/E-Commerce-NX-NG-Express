import {Product} from "./product";
import {Order} from "./order";

export class OrderItem {
  id: number = NaN;
  unit_price: number = NaN;
  quantity: number = NaN;
  totalPrice: number = NaN;
  orderId: number = NaN;
  productId: number = NaN;
}