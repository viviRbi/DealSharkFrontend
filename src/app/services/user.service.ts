import { DEALSHARK_URL } from './../../environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './../models/user.model';
import { ClientMessage } from './../models/client-message.model';
import { Injectable } from '@angular/core';


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


  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
    //  console.log(error); // log it to the console if something goes wrong

      // let the app keep running by returning an empty shell
      return of(result as T);
    }
  }
}
