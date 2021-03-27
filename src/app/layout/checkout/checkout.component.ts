import { order } from './../../models/order';
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

  orderArray: Array<order> = [];

  
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


//Creating an array of order objects using the list of games in the cart (session)
  for(let i = 0; i < this.session.length; i++) {
    let theOrder: order = {gameId: 0, gamePrice: 0, quantity: 1, orderUserId: 0}
    theOrder.gameId = this.session[i].gameID;
    theOrder.gamePrice = this.session[i].salePrice;
    theOrder.orderUserId = this.currentUser.id;
    this.orderArray.push(theOrder);
  }

  console.log("here is the orderArray" + JSON.stringify(this.orderArray));

  this.newOrder.totalPrice = this.totalPrice;
  this.newOrder.userId = this.currentUser.id;

  console.log("here is the new order: " + JSON.stringify(this.newOrder));
  console.log(this.session)
  this.checkoutService.sendOrderUser(this.newOrder);
  this.checkoutService.sendGamesArray(this.orderArray);

}

}


