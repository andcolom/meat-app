import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  rates: number[] = [1,2,3,4,5]
  rate: number = 0
  previousRate: number
  @Output() rated = new EventEmitter()

  setRate(r:number){
    this.rate = r
    this.previousRate = undefined
    this.rated.emit(r)
  }

  setTemporaryRate(r:number){
    if(this.previousRate==undefined){
      this.previousRate = this.rate
    }
    this.rate = r
  }

  clearTemporaryRate(r:number){
    if(this.previousRate!=undefined){
      this.rate = this.previousRate
      this.previousRate = undefined
    }
    
  }
}
