import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit {

  ngAfterContentInit(): void {
    this.input = this.model || this.control
    if(this.input === undefined)
      throw new Error("Componente precisa ser utilizado com diretiva.");
  }
  constructor() { }

  ngOnInit() {
  
  }

  input: any
  @Input() label: string
  @Input() errorMessage:string

  @ContentChild(NgModel) model : NgModel
  @ContentChild(FormControlName) control : FormControlName

  hasSuccess (): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
