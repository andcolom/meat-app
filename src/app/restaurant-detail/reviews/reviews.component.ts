import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private service : RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = 
      this.service.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}
