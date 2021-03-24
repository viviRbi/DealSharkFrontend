import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { IGameDeal, IGameDealDetail } from "../models/gameModel";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // Get game deal API from environment.ts -> works
  private gameDealApi = environment.gameDealApi;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }

  constructor(private http: HttpClient) { 
   console.log(this.gameDealApi)
  }

  getGames(): Observable<IGameDeal[]>{
    return this.http.get<IGameDeal[]>(this.gameDealApi).pipe(
      tap(data => console.log("tap_getGames" ,data)),
      catchError(this.handleError<any>('getGames',[]))
    );
  };

  getGameById(id): Observable<IGameDealDetail>{
    return this.http.get<IGameDealDetail>(this.gameDealApi+ "?id=" + id).pipe(
      tap(data => console.log("tap_getGames" ,data)),
      catchError(this.handleError<any>('getGames',[]))
    );
  };

  getGameByQuery(query):Observable<IGameDeal[]>{
    return this.http.get<IGameDeal[]>(this.gameDealApi + query).pipe(
      tap(data => console.log("tap_getGamesByQuery" ,this.gameDealApi + query)),
      catchError(this.handleError<any>('getGamesByQuery',[]))
    );
  }; 

  // for welcome carousel
  getFourHighMetaCriticGame(): Observable<IGameDeal[]>{
    return this.http.get<IGameDeal[]>(this.gameDealApi + '?sortBy=metacritic&pageSize=4').pipe(
      tap(data => console.log("tap_get4Games high metacritic score" ,data)),
      catchError(this.handleError<any>('getGames',[]))
    );
  }

  // For sorting gamelist. orderBy: 1 is asc, orderBy: -1 is desc
  sortOn(property, orderBy){
    return function (deal1: IGameDeal, deal2: IGameDeal){
      if (deal1[property] > deal2[property]) return 1*orderBy
      else if (deal1[property] === deal2[property]) return 0;
      else return -1*orderBy
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
