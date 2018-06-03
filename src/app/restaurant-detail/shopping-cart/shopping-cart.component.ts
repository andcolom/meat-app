import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart-service';
import { MenuItem } from '../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private service: ShoppingCartService) { }

  ngOnInit() {
  }

  total():number{
    return this.service.total();
  }

  items():CartItem[]{
    return this.service.items
  }

  clear(){
    this.service.clear()
  }

  removeItem(item:CartItem){
    this.service.removeItem(item)
  }

  addItem(item:MenuItem){
    this.service.addItem(item)
  }
}
