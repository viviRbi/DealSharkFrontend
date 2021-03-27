import { orderUser } from '../../models/orderUser';
import { CheckoutService } from './../../services/checkout.service';

import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment"
import { BrowserModule } from '@angular/platform-browser'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  session = JSON.parse(sessionStorage.getItem(environment.sessionNameForCart));

  totalPrice=0;

  
  newOrder: orderUser = {
    totalPrice: 0,
    userId: 0
  }

  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
  }

viewSessionStorage() {
    var session = JSON.parse(sessionStorage.getItem(environment.sessionNameForCart));
    console.log("Here is session length" + session.length);
    console.log(session[0].salePrice)
    console.log('Here is the current users id: ' + this.currentUser.id);
}

purchaseGames() {
  for(let i = 0; i < this.session.length; i++) {
    this.totalPrice = this.totalPrice + +this.session[i].salePrice;
  }
  console.log("Total price is: " + this.totalPrice);

  this.newOrder.totalPrice = this.totalPrice;
  this.newOrder.userId = this.currentUser.id;

  console.log("here is the new order: " + JSON.stringify(this.newOrder));

  this.checkoutService.sendOrderUser(this.newOrder);
  this.checkoutService.sendGamesArray(this.session);

}

}


