import { orderUser } from './../../models/orderUser';
import { ClientMessage } from './../../models/client-message.model';
import { User } from 'src/app/models/user.model';
import { order } from './../../models/order';

import { CheckoutService } from './../../services/checkout.service';

import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment"
import { BrowserModule } from '@angular/platform-browser'
import { IGameInfo, IGameDeal } from 'src/app/models/gameModel';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice=0;

  gameId=0;
  gamePrice=0;
  quantity=0;
  

  

  orderArray: IGameInfo[] = [];

  arr = [];

  newOwnedGames: order = {
    gameId: 0,
    gamePrice: 5,
    quantity: 0,
    orderUser: { orderUserId : 0}
  }

  
  newOrder: orderUser = {
    totalPrice: 0,
    user : {id : 0}
  }

  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  
  

  constructor(private checkoutService: CheckoutService) { }

  orderUser?: orderUser;

  ngOnInit(): void {
    this.orderArray = Boolean(sessionStorage.getItem(environment.sessionNameForCart))== true ? JSON.parse(sessionStorage.getItem(environment.sessionNameForCart)) : null;

   

  }

  public clientMessage: ClientMessage = new ClientMessage("");

viewSessionStorage() {
    var session = JSON.parse(sessionStorage.getItem(environment.sessionNameForCart));
    console.log("Here is session length" + session.length);
    console.log(session[0].salePrice)
    console.log('Here is the current users id: ' + this.currentUser.id);
    
}

purchaseGames() {
  this.totalPrice = 0 // Total price still saved after purchased, so we set it = 0 or else it'll return double price 
 for(let i = 0; i < this.orderArray.length; i++) {
    this.totalPrice += this.orderArray[i].salePrice *1 ;
  }
  console.log("Total price is: " + this.totalPrice);


//Creating an array of order objects using the list of games in the cart (orderArray)
  // for(let i = 0; i < this.orderArray.length; i++) {
  //   let theOrder: order = {gameId: 0, gamePrice: 0, quantity: 1, orderUserId: 0}
  //   theOrder.gameId = this.orderArray[i].gameID;
  //   theOrder.gamePrice = this.orderArray[i].salePrice;
  //   theOrder.orderUserId = this.currentUser.id;
  //   // this.orderArray.push(theOrder);
  // }

  for(let i = 0; i < this.orderArray.length; i++) {
    
    // this.orderArray.push(theOrder);
  }

  // console.log("here is the orderArray" + JSON.stringify(this.orderArray));

  this.arr.push(this.orderArray[0].gameID);
  this.arr.push(this.orderArray[0].salePrice);
  this.arr.push(1);
  this.arr.push(this.currentUser.id);
  console.log("this is the arr " + this.arr);

  this.newOrder.totalPrice = this.totalPrice;
  this.newOrder.user = {"id" : ""+ this.currentUser.id + ""};


  sessionStorage.setItem('currentSale', JSON.stringify(this.orderUser));


  const currentSale = JSON.parse(sessionStorage.getItem('orderUser'));
  console.log("this is the current sale " + currentSale);

  

 

  
  this.newOwnedGames.gameId = this.orderArray[0].gameID;
  this.newOwnedGames.gamePrice = this.totalPrice;
  this.newOwnedGames.quantity = 1;
  this.newOwnedGames.orderUser = {"orderUserId" : ""+ this.currentUser.id + ""};

  

 

  console.log("here is the new order: " + JSON.stringify(this.newOrder));
  console.log("here is the orderArray" + JSON.stringify(this.orderArray[0].gameID));
  console.log("this is new owned games object " + JSON.stringify(this.newOwnedGames));
  console.log("this is the new owned games object without stringify " + this.newOwnedGames);
  console.log(this.orderArray)
  this.checkoutService.sendOrderUser(this.newOrder).subscribe(data => this.clientMessage = data, error => this.clientMessage.message = "something went wrong in checkout.ts");
  this.checkoutService.sendGamesArray(this.newOwnedGames).subscribe(data => this.clientMessage = data, error => this.clientMessage.message = "something went wrong in checkout.ts 2");

  }

 
}


