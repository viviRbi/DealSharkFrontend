import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription} from 'rxjs';

import { IGameDeal } from 'src/app/models/gameModel';
import { GameService } from "../../../services/game.service";

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ISearchGame } from 'src/app/models/searchGame';

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
  sortNumber: number = 1;
  @Input('searchTerm') searchTerm: ISearchGame;

  constructor(private gameService: GameService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getGameDealList();
  }

  ngOnDestroy(): void {
    // Unsubscribe to free unnecessary lapse of memory
    this.sub.unsubscribe();
  }


  submitSearch(){
    if(this.gameDealSorted != undefined){
      let queryUrl : string =  ""
      // searchTerm was passed using Input
      let inputArrRaw = Object.entries(this.searchTerm).map(([key, value]) => [key, value])
      let inputArr = []
    
      // if there is a null value. Do not push it in inputArr
      for (let j =0; j<inputArrRaw.length; j++) {
        if( inputArrRaw[j][1] != null){
          inputArr.push(inputArrRaw[j])
        }
      }

      // create the query. 0 is keyword. 1 is value
      for (let i =0; i<inputArr.length; i++) {
        if (inputArr[i][0] == 'title' && inputArr[i][1].trim() != "")  queryUrl += `&title=${inputArr[i][1]}`
        if (inputArr[i][0] == 'recent' && inputArr[i][1] == true)  queryUrl += "&sortBy=recent&desc=1"
        if (inputArr[i][0] == 'priceLessThan' && inputArr[i][1].trim() != "")  queryUrl += `&lowerPrice=${inputArr[i][1]}`
        if (inputArr[i][0] == 'priceMoreThan' && inputArr[i][1].trim() != "")  queryUrl += `&upperPrice=${inputArr[i][1]}`
        if (inputArr[i][0] == 'onSale' && inputArr[i][1] == true)  queryUrl += "&onSale=1"
      }
      // add ? and delete & for the first keyword
      queryUrl = "?" + queryUrl.substring(1)

      this.sub = this.gameService.getGameByQuery(queryUrl).subscribe(deals => this.gameDealSorted = deals)
    }
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
        this.sortByTitle()
        break;
      case 'sortByMetaCritic':
        this.sortByMetaCritic()
        break;
      case 'sortByRecent':
        this.sortByRecent()
        break;
      case 'sortBySalePrice':
        this.sortBySalePrice()
        break;
      // sort by deal or other wrong url
      default:
        this.gameDealSorted = this.gameDeal
        this.sortByParam = "Sort By Deal"
    }
  }

  goBack(): void {
    this.location.back();
  }

  convertTimeStampToDate(timeStamp){
    return new Date(timeStamp);
  }

  sortByTitle(){
    this.gameDealSorted=this.gameDeal.sort(this.gameService.sortOn("title", this.sortNumber)) // Positive 1 is order by asc, Negative -1 is order by desc
    this.sortByParam = "Sort By Title"
    this.sortNumber = this.sortNumber * -1
  }
  sortByMetaCritic(){
    this.gameDealSorted=this.gameDeal.sort(this.gameService.sortOn("metacriticScore", this.sortNumber * -1))
    this.sortByParam = "Sort By Metacritic"
    this.sortNumber = this.sortNumber * -1
  }
  sortByRecent(){
    this.gameDealSorted=this.gameDeal.sort(this.gameService.sortOn("releaseDate", this.sortNumber * -1))
    this.sortByParam = "Sort By Recent"
    this.sortNumber = this.sortNumber * -1
  }
  sortBySalePrice(){
    this.gameDealSorted=this.gameDeal.sort(this.gameService.sortOn("salePrice", this.sortNumber))
    this.sortByParam = "Sort By Sale Price"
    this.sortNumber = this.sortNumber * -1
  }
  sortByDeal(){
    this.sortByParam = "Sort By Deal"
    this.gameDealSorted = this.gameDeal.sort(this.gameService.sortOn("dealRating", this.sortNumber))
    this.sortNumber = this.sortNumber * -1
  }

}
