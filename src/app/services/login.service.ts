import { loginTemplate } from './../models/loginTemplateModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { DEALSHARK_URL } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }


  constructor (private http: HttpClient) { }



  public loginUser(login: loginTemplate): Observable<loginTemplate> {
    console.log("Here it is again: " + login);
    return this.http.post<loginTemplate>(`${DEALSHARK_URL}authenticateUser`, login, this.httpOptions) .pipe(
      catchError(this.handleError<User>('loginUser', undefined))
    )
  }
  

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log it to the console if something goes wrong

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }



  }

  



