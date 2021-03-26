import { Component, OnInit } from '@angular/core';
import { IGameDeal } from 'src/app/models/gameModel';
import { environment } from "../../../environments/environment";
import { Subscription} from 'rxjs';
import { GameService } from "../../services/game.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  frontEnd = environment.frontEnd;
  games : IGameDeal[];
  sub: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    //this.getFiveGame()
  }

  //----- Really Low resolution picture
  /*getFiveGame(){
    this.sub = this.gameService.getFiveHighMetaCriticGame().subscribe(dataArr => this.games = dataArr)
  }*/
}
