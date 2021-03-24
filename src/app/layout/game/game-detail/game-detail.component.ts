import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs';

import { IGameInfo } from 'src/app/models/gameModel';
import { GameService } from "../../../services/game.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit, OnDestroy {

  deal? : IGameInfo;
  sub: Subscription;

  constructor(private gameService : GameService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getGameById()
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  getGameById(){
    const id = this.route.snapshot.paramMap.get('deal');
    console.log("deal" + id)
    this.sub = this.gameService.getGameById(id).subscribe(data => this.deal = data.gameInfo)
  }

  goBack(): void {
    this.location.back();
  }

}
