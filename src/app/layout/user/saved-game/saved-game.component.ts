import { Component, OnInit } from '@angular/core';
import { IGameInfo } from 'src/app/models/gameModel';
import { ParentChildCommuteService } from 'src/app/services/parent-child-commute.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-saved-game',
  templateUrl: './saved-game.component.html',
  styleUrls: ['./saved-game.component.css']
})
export class SavedGameComponent implements OnInit {

  savedGames? : IGameInfo[] =[]

  constructor(/*private parentChildCommute : ParentChildCommuteService*/) { }

  ngOnInit(): void{
    // //---------- Connect to database, if there's no session look to the database and query it
    this.savedGames = Boolean(sessionStorage.getItem(environment.sessionNameForSave))== true ? JSON.parse(sessionStorage.getItem('savedItem')) : null

    
  }

  clearSessionSavedGame(){
    sessionStorage.removeItem(environment.sessionNameForSave)
    console.log("clear")
  }

}
