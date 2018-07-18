import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl }  from '@angular/forms';


@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private service:OrderService
    , private router: Router
    , private builder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.builder.group(
      {
        name: this.builder.control("", [Validators.required,Validators.minLength(5)]),
        email:this.builder.control("", [Validators.required,Validators.pattern(this.emailPattern)]),
        emailConfirmation:this.builder.control("",[Validators.required,Validators.pattern(this.emailPattern)]),
        address:this.builder.control("",[Validators.required,Validators.minLength(5)]),
        number:this.builder.control("",[Validators.required,Validators.pattern(this.numberPattern)]),
        optionalAddress:this.builder.control(""),
        paymentOption:this.builder.control("",[Validators.required]),
      },
      { validator: OrderComponent.equalsTo}
    )
  }

  static equalsTo(group: AbstractControl) : {[key: string]:boolean} {
    const email = group.get("email")
    const emailConfirmation = group.get("emailConfirmation")
    if ( !email || !emailConfirmation){
      return undefined
    }
    if(emailConfirmation.value != email.value){
      return {"emailsNotMatch":true}
    }

    return undefined;
  }

  emailPattern  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  orderForm: FormGroup

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
