import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() items: CartItem[]

  @Output() increaseQt = new EventEmitter<CartItem>()
  @Output() decreaseQt = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  emitIncreaseQt(item: CartItem) {
    this.increaseQt.emit(item)
  }

  emitDecreaseQt(item: CartItem) {
    this.decreaseQt.emit(item)
  }

  emitRemove(item: CartItem) {
    this.remove.emit(item)
  }

}
