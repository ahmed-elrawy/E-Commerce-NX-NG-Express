import {CartItem} from "./cart-item";
import {Category} from "./category";
import {OrderItem} from "./order-item";

export class Product {
  id: number= NaN;
  name: string = "";
  description: string= "";
  price: number=NaN;
  publishedIn!: Date ;
  addedToCart!: boolean;
  quantity!: number;
  image!: string;
  category!: Category;
  cartQuantity!: number;
  cartItem!: CartItem;
  order_items!: OrderItem[];
}