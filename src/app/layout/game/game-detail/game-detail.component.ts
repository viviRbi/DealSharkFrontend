import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs';
import { Location } from '@angular/common';

import { IGameInfo } from 'src/app/models/gameModel';
import { GameService } from "../../../services/game.service";
import { ParentChildCommuteService } from "../../../services/parent-child-commute.service"
import { environment } from "../../../../environments/environment"

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
    private route: ActivatedRoute, private location: Location
  ) { }

  ngOnInit(): void {
    this.getGameById()
  }

  // Avoid memory leak
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  // Pass game obj to app compnenent to get save/ in cart quantity showed on navbar in DoCheck life cycle hook
  // doesn't actually use the info. Only pass to activate DoCheck. But can be used for future purpose as it's an observable and usable  
  passSaveGame(){
    this.parentChildCommute.emitSaveChange(this.deal)
    this.addToSession(environment.sessionNameForSave)
  }

  passCartGame(){
    this.parentChildCommute.emitCartChange(this.deal)
    this.addToSession(environment.sessionNameForCart)
    
  }
  // --- End pass game obj to app compnenent to get save/ in cart quantity showed on navbar in DoCheck

  // Add save/in cart game to session storage
  addToSession(sessionName): void{
    let inCart = []
    inCart.push(this.deal)
    if (Boolean(sessionStorage.getItem(sessionName)) == true){
      let parseGames = JSON.parse(sessionStorage.getItem(sessionName))
      for (let i = 0; i<parseGames.length; i ++){
        if(this.deal.gameID !== parseGames[i].gameID){
          inCart.push(parseGames[i])
        }
      }
    }
    console.log(inCart)
    sessionStorage.setItem(sessionName, JSON.stringify(inCart))

    // I needed to convert the session into 'sessionName' with the quotations to access it from checkout
    var session = JSON.parse(sessionStorage.getItem(sessionName));
    sessionStorage.setItem('sessionName', JSON.stringify(session))

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
