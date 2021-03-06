import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs';
import { Location } from '@angular/common';

import { IGameInfo } from 'src/app/models/gameModel';
import { GameService } from "../../../services/game.service";
import { ParentChildCommuteService } from "../../../services/parent-child-commute.service"
import { environment } from "../../../../environments/environment"
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit, OnDestroy {

  deal? : IGameInfo;
  sub: Subscription;
  alert: string;

  constructor(
    private gameService : GameService, private parentChildCommute: ParentChildCommuteService, 
    private route: ActivatedRoute, private location: Location, public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getGameById()
    //this.parentChildCommute.changeSaveEmitted$.subscribe(data =>console.log(data))
  }

  // Avoid memory leak
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  // Pass game obj to app compnenent to get save/ in cart quantity showed on navbar in DoCheck life cycle hook
  // doesn't actually use the info. Only pass to activate DoCheck. But can be used for future purpose as it's an observable and usable  
  passSaveGame(){
    
    // Maybe Remove later if successfully retrieved and update saved game and able to connect the dot
    this.addToSession(environment.sessionNameForSave, "save")
  }

  passCartGame(){
    
    // Maybe Remove later if successfully retrieved and update saved game and able to connect them
    this.addToSession(environment.sessionNameForCart, "cart")
    
  }
  // --- End pass game obj to app compnenent to get save/ in cart quantity showed on navbar in DoCheck

  // Add save/in cart game to session storage
  addToSession(sessionName, type): void{
    let inCart: IGameInfo[] = []
    let dealId = this.route.snapshot.paramMap.get('deal');
    this.deal.dealId = dealId
    inCart.push(this.deal)
    //console.log("session",sessionStorage.getItem(sessionName))
    if (Boolean(sessionStorage.getItem(sessionName)) == true){
      let parseGames = JSON.parse(sessionStorage.getItem(sessionName))
      for (let i = 0; i<parseGames.length; i ++){
        if( parseGames[i].gameID != this.deal.gameID){
          inCart.push(parseGames[i])
        }
      }
    } //else console.log("no game in session")
    //console.log("detail game "+ type, inCart)
    if (type == 'save') this.parentChildCommute.emitSaveChange(inCart.length)
    else if (type === "cart")  this.parentChildCommute.emitCartChange(inCart.length)
    sessionStorage.setItem(sessionName, JSON.stringify(inCart))
  }

  getGameById(){
    const id = this.route.snapshot.paramMap.get('deal');
    this.sub = this.gameService.getGameById(id).subscribe(data => this.deal = data.gameInfo)
  }

  // Retrieved save game from database, push this saved game in 

  goBack(): void {
    this.location.back();
  }

}
