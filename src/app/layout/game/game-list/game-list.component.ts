import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';

import { IGameDeal } from 'src/app/models/gameModel';
import { GameService } from "../../../services/game.service";

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnDestroy {
  gameDeal: IGameDeal[];
  gameDealSorted: IGameDeal[];
  sub: Subscription;
  sortByParam: string;

  constructor(private gameService: GameService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getGameDealList();
  }

  ngOnDestroy(): void {
    // Unsubscribe to free unnecessary lapse of memory
    this.sub.unsubscribe();
  }

  getGameDealList(){
    this.sub= this.gameService.getGames().subscribe(
      deals => {
        this.gameDeal = deals
        this.getRecentDealList()
      }
    );
  }

  getRecentDealList(){
    // get the url param of sortBy
    const sortBy = this.route.snapshot.paramMap.get('sortBy');
    
    switch(sortBy){
      case 'sortByTitle':
        this.gameDealSorted=this.gameDeal.sort(this.gameService.sortOn("title", 1)) // Positive 1 is order by asc, Negative -1 is order by desc
        this.sortByParam = "Sort By Title"
        console.log("title", this.gameDealSorted)
        break;
      case 'sortByMetaCritic':
        this.gameDealSorted=this.gameDeal.sort(this.gameService.sortOn("", -1))
        this.sortByParam = "Sort By Metacritic"
        console.log("meta critic", this.gameDealSorted)
        break;
      case 'sortByRecent':
        this.gameDealSorted=this.gameDeal.sort(this.gameService.sortOn("releaseDate", -1))
        this.sortByParam = "Sort By Recent"
        console.log("release day", this.gameDealSorted)
        break;
      // sort by deal or other wrong url
      default:
        this.sortByParam = "Sort By Deal"
        this.gameDealSorted = this.gameDeal
    }
  }

}
