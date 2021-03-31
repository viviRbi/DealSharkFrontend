import { ClientMessage } from './../../models/client-message.model';
import { LoginService } from './../../services/login.service';
import { IUserLoginTemplate } from './../../models/userLogin';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GameService } from 'src/app/services/game.service';
import { IGameDealDetail, IGameInfo } from 'src/app/models/gameModel';
import { Subscription } from 'rxjs';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameDetailComponent } from '../game/game-detail/game-detail.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit{
  

  constructor(private loginService: LoginService,  private router: Router, private route: ActivatedRoute, private gameService: GameService, private http: HttpClient) { }

  public clientMessage: ClientMessage = new ClientMessage('');

  saveToSession: IGameInfo[] = []

  userLogin?: IUserLoginTemplate = {username:"",password:""}
  errMessage: String
  user?: User
  mouseoverLogin : boolean // Use for template form to catch mouse over and mouse leave event to display form error
  sub: Subscription
   
  ngOnInit(){
    console.log("on init",this.saveToSession)
  }

  public loginUserFromService(): void {

    this.loginService.loginUser(this.userLogin).subscribe(data =>{
        // Wrong username and password case
      if (data == null || data.username == ""){
        this.errMessage= "Incorrect username or password"
      }else { 
        this.user = data
        this.saveGameArrToSession(this.user.gamesArray)
        sessionStorage.setItem(environment.sessionUser, JSON.stringify(this.user));
        //sessionStorage.setItem(environment.sessionNameForSave, JSON.stringify(this.user.gamesArray))
        console.log("game arr",this.user.gamesArray)
        console.log("save game",this.user.saved_games)
        this.router.navigateByUrl(HttpParams['return']);
      }
    })
  }

  private saveGameArrToSession(savedGameString){

    if (savedGameString.includes(",")){
      let savedGameArr = savedGameString.split(",")
    
      let observableBatch  = []
      let gameDetail : IGameDealDetail[]
      savedGameArr.forEach((i) => {
        observableBatch.push(this.http.get(environment.gameDealApi+ "?id=" + i))
      })
      // forkJoin ([url1, url2]).subscribe
      this.sub = forkJoin(observableBatch).subscribe(data => {
        gameDetail = data as IGameDealDetail[]
        this.ifSaveGameisArray(gameDetail)
        this.saveToSession.forEach((e,i) => e.dealId = savedGameArr[i])
        sessionStorage.setItem(environment.sessionNameForSave, JSON.stringify(this.saveToSession))
      })    // cast type
      // get only the info part to fit IGameInfo
    }   else {
      this.sub = this.gameService.getGameById(savedGameString).subscribe(data => this.saveToSession.push(data.gameInfo))
      // set dealId for update Save array at logout to work 
      this.saveToSession[0].dealId = savedGameString
    }
  }

  ifSaveGameisArray(gameDetailArr){
      if (gameDetailArr.length >1){
        gameDetailArr.forEach(e => {
          this.saveToSession.push(e.gameInfo)
        });
      }
  }

}
