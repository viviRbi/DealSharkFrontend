import { ClientMessage } from './../../models/client-message.model';
import { User } from 'src/app/models/user.model';
import { order } from './../../models/order';
import { orderUser } from '../../models/orderUser';
import { CheckoutService } from './../../services/checkout.service';

import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment"
import { BrowserModule } from '@angular/platform-browser'
import { IGameInfo } from 'src/app/models/gameModel';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice=0;

  

  orderArray: IGameInfo[] = [];

  
  newOrder: orderUser = {
    totalPrice: 0,
    user : {id : 0}
  }

  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  constructor(private checkoutService: CheckoutService) { }

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
 /* for(let i = 0; i < this.orderArray.length; i++) {
    let theOrder: order = {gameId: 0, gamePrice: 0, quantity: 1, orderUserId: 0}
    theOrder.gameId = this.orderArray[i].gameID;
    theOrder.gamePrice = this.orderArray[i].salePrice;
    theOrder.orderUserId = this.currentUser.id;
    //this.orderArray.push(theOrder);
  }*/

  console.log("here is the orderArray" + JSON.stringify(this.orderArray));

  this.newOrder.totalPrice = this.totalPrice;
  this.newOrder.user = {"id" : ""+ this.currentUser.id + ""};

  console.log("here is the new order: " + JSON.stringify(this.newOrder));
  console.log(this.orderArray)
  this.checkoutService.sendOrderUser(this.newOrder).subscribe(data => this.clientMessage = data, error => this.clientMessage.message = "something went wrong in checkout.ts");
 // this.checkoutService.sendGamesArray(this.orderArray);

  }

  /////////////////////////////////////////////////////

  // this.heroService.registerHero(this.hero).subscribe(data => this.clientMessage = data, error => this.clientMessage.message = 'SOMETHING WENT WRONG IN register.ts');
  // }

////////////////////////////////////////////////////
  // public registerUserFromService(): void {
  //   this.userService.registerUser(this.user).subscribe(data => {
  //     this.clientMessage = data
  //     if (data != null){
  //       console.log(data)
  //       this.message = "You have successfully create an account. Please click here to log in"
  //     }else 
  //       this.errMessage = "Something had gone wrong at the backend or you have been disconnect to our server"
  //   }, error => this.clientMessage.message = 'SOMETHING WENT WRONG IN REGISTER.TS')
  // }
  /////////////////////////////////////////////////////////////////////////
}


