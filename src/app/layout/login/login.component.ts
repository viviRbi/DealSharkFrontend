import { ClientMessage } from './../../models/client-message.model';
import { LoginService } from './../../services/login.service';
import { IUserLoginTemplate } from './../../models/userLogin';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GameService } from 'src/app/services/game.service';
import { IGameDealDetail, IGameInfo } from 'src/app/models/gameModel';
import { Subscription } from 'rxjs';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit, OnDestroy{
  

  constructor(private loginService: LoginService,  private router: Router, private route: ActivatedRoute, private gameService: GameService, private http: HttpClient) { }

  public clientMessage: ClientMessage = new ClientMessage('');

  saveToSession: IGameInfo[] = []

  userLogin?: IUserLoginTemplate = {username:"",password:""}
  errMessage: String
  user?: User
  mouseoverLogin : boolean // Use for template form to catch mouse over and mouse leave event to display form error
  sub: Subscription
   
  ngOnInit(){
    //console.log("on init",this.saveToSession)
  }
  
  ngOnDestroy(){
    if(this.sub)
      this.sub.unsubscribe()
  }

  public loginUserFromService(): void {

    this.sub= this.loginService.loginUser(this.userLogin).subscribe(data =>{
        // Wrong username and password case
      if (data == null || data.username == ""){
        this.errMessage= "Incorrect username or password"
      }else { 
        this.user = data
        sessionStorage.setItem(environment.sessionUser, JSON.stringify(this.user));
       // console.log("Here's the user", data)
        //console.log("game arr",this.user.gamesArray)
        if(this.user.gamesArray != null) this.saveGameArrToSession(this.user.gamesArray)
        this.router.navigateByUrl(HttpParams['return']);
      }
    })
  }


  private saveGameArrToSession(savedGameString){
    if (savedGameString.includes(",")){
      let savedGameArr = savedGameString.split(",")
    //console.log("2 and aboe")
      let observableBatch  = []
      let gameDetail : IGameDealDetail[]
      savedGameArr.forEach((i) => {
        //console.log(environment.gameDealApi+ "?id=" + i)
        observableBatch.push(this.http.get(environment.gameDealApi+ "?id=" + i))
      })
      // forkJoin ([url1, url2]).subscribe
      // do not use this.sub. Cannot console.log inside forkJoin + save Session
      forkJoin(observableBatch).subscribe(data => {
        gameDetail = data as IGameDealDetail[] // cast type
        this.ifSaveGameisArray(gameDetail, savedGameArr)
        sessionStorage.setItem(environment.sessionNameForSave, JSON.stringify(this.saveToSession))
      })    
      // get only the info part to fit IGameInfo
    } else if (savedGameString.trim() >0){
    
      this.gameService.getGameById(savedGameString).subscribe(data => {
        // set dealId for update Save array at logout to work 
        data.gameInfo.dealId = savedGameString
        this.saveToSession.push(data.gameInfo)
        sessionStorage.setItem(environment.sessionNameForSave, JSON.stringify(this.saveToSession))
      })
    }
    //console.log("login session", sessionStorage.getItem(environment.sessionNameForSave) )
  }

  ifSaveGameisArray(gameDetailArr , gameId){
      if (gameDetailArr.length >1){
        gameDetailArr.forEach((e,i) => {
          e.gameInfo.dealId = gameId[i]
          this.saveToSession.push(e.gameInfo)
        });
      }
     // console.log("save to seesion ",this.saveToSession)
  }

}
