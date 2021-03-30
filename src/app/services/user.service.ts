import { DEALSHARK_URL, environment } from './../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './../models/user.model';
import { ClientMessage } from './../models/client-message.model';
import { Injectable } from '@angular/core';
import { IGameInfo } from '../models/gameModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type ' : 'application/json', 'Access-Control-Allow-Origin':'*'})
  }


  constructor(private http: HttpClient) { }

  public registerUser(user : User): Observable<ClientMessage> {
    return this.http.post<ClientMessage>(`${DEALSHARK_URL}register`, user)
    .pipe(catchError(this.handleError<ClientMessage>('register User', undefined)));
  }

  public updateSavedGame() : Observable<string>{
  
    let savedGameString = this.getDealIdFromSavedGame()
    let sendRequest = {
      user_id : JSON.parse(sessionStorage.getItem(environment.sessionUser)).id,
      saved_games: savedGameString
    }
    // { responseType: 'text' as 'json' } to receive a String 
    return this.http.post<string>(`${DEALSHARK_URL}updateSavedGame`,sendRequest, { responseType: 'text' as 'json' } ).pipe(
      tap(data=>console.log("tap_update Saved game to database",data)),
      catchError(this.handleError<any>("updateSavedGame", "error"))
      )
  }


  private getDealIdFromSavedGame(){
    let savedGameString : string = ""
    let saveGameArr : IGameInfo[] = JSON.parse(sessionStorage.getItem(environment.sessionNameForSave))
    console.log("get deal id for saved game", saveGameArr)
    saveGameArr.forEach(element => {
      savedGameString += element.dealId+ ","
    });
    return savedGameString.slice(0,-1)
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
}
