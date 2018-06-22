import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  paymentsOptions: RadioOption[] = [
    {  label: "Dinheiro", value:"MON"},
    {  label: "Cartão de Débito", value:"DEB"},
    {  label: "Cartão Refeição", value:"REF"}]

}
