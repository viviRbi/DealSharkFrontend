import { orderUser } from './../models/orderUser';
import { DEALSHARK_URL } from './../../environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './../models/user.model';
import { ClientMessage } from './../models/client-message.model';
import { Injectable } from '@angular/core';
import { order } from '../models/order';



@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type ' : 'application/json'})
  }


  constructor(private http: HttpClient) { }

 public sendOrderUser(newOrder : orderUser): Observable<ClientMessage> {
   console.log("it is hitting here");
   return this.http.post<ClientMessage>(`${DEALSHARK_URL}newOrder`, newOrder)
   .pipe(catchError(this.handleError<ClientMessage>('New Order', undefined)));
   
 }

//  public registerUser(user : User): Observable<ClientMessage> {
   
//   return this.http.post<ClientMessage>(`${DEALSHARK_URL}register`, user)
//   .pipe(catchError(this.handleError<ClientMessage>('register User', undefined)));
// }

public sendGamesArray(newOwnedGames: order): Observable<ClientMessage> {

  console.log("hitting sendGamesArray as well");
  return this.http.post<ClientMessage>(`${DEALSHARK_URL}newOwnedGames`, newOwnedGames)
  .pipe(catchError(this.handleError<ClientMessage>('New Owned Games', undefined)));
}

   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };

 }
}