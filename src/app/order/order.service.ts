import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart-service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";
import { Http,Headers, RequestOptions } from "@angular/http";
import { MEAT_API } from "../app.api";

@Injectable()
export class OrderService {


    constructor(private cartService:ShoppingCartService, private http: Http){

    }

    cartItems(): CartItem[]{
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem):void {
      
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem): void {
        this.cartService.removeItem(item)
    }

    itemsValue(): number {
        return this.cartService.total()
    }

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers();
        headers.append("Content-Type","application/json")
        return this.http.post(`${MEAT_API}/orders`,
                                JSON.stringify(order), 
                                new RequestOptions({headers:headers}))
                                .map(res=>res.json())
                                .map(order=>order.id)
    }

    
  clear(): void {
    this.cartService.clear()
  }
}