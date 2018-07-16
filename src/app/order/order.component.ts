import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private service:OrderService, private router: Router) { }

  ngOnInit() {
  }

  delivery:number = 8.00

  paymentsOptions: RadioOption[] = [
    {  label: "Dinheiro", value:"MON"},
    {  label: "Cartão de Débito", value:"DEB"},
    {  label: "Cartão Refeição", value:"REF"}]

  itemsValue():number{
    return this.service.itemsValue()
  }
  
  cartItems(): CartItem[]{
      return this.service.cartItems()
  }

  increaseQty(item: CartItem){
      this.service.increaseQty(item)
  }

  decreaseQty(item: CartItem):void {
      this.service.decreaseQty(item)
  }

  remove(item: CartItem){
    this.service.remove(item)
  }

  checkOrder(order:Order){
    order.orderItems = this.cartItems()
      .map((item:CartItem)=> new OrderItem(item.quantity, item.menuItem.id) )
    this.service.checkOrder(order)
    .subscribe(
      (orderId:string)=> 
      {
        console.log(`Compra concluída: ${orderId}`)
        this.service.clear()
        this.router.navigate(["/order-summary"])
      }
    )
    
  }

}
