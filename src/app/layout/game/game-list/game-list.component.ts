import { Component, OnInit, OnDestroy, DoCheck, Input, SimpleChanges } from '@angular/core';
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
export class GameListComponent implements OnInit, DoCheck, OnDestroy {
  gameDeal: IGameDeal[];
  gameDealSorted: IGameDeal[];
  sub: Subscription;
  sortByParam: string;
  @Input('searchTerm') searchTerm: ISearchGame;

  constructor(private gameService: GameService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getGameDealList();
  }

  ngOnDestroy(): void {
    // Unsubscribe to free unnecessary lapse of memory
    this.sub.unsubscribe();
  }

  ngDoCheck() {
    console.log('check')
      // convert to key, value array [[key,value],[key,value]]
      /*if(this.gameDealSorted != undefined){
        let inputArr = Object.entries(this.searchTerm).map(([key, value]) => [key, value])
        for (let i =0; i<inputArr.length; i++) {
          if (inputArr[i][0] == 'title') this.gameDealSorted.filter(each => each.title.includes(inputArr[i][1] + '')) // turn to a string
          if (inputArr[i][0] == 'recent') this.gameDealSorted.sort(this.gameService.sortOn("releaseDate", -1))
           //if there is sale price, filter by sale parice, else filter by normal price
          if (inputArr[i][0] == 'priceLessThan') this.gameDealSorted.filter(each => each.salePrice>0? each.salePrice < inputArr[i][1]: each.normalPrice < inputArr[i][1])
          if (inputArr[i][0] == 'priceMoreThan') this.gameDealSorted.filter(each => each.salePrice>0? each.salePrice > inputArr[i][1]: each.normalPrice > inputArr[i][1])

          //if (inputArr[i][0] == 'AAA') this.gameDealSorted.filter(each => each.isOnSale == 1) // 0: false 1: true
        };
      }*/
      //this.gameDealSorted.filter(each => each[filterArr[0]] == filterArr[1])
      
  }

  submitSearch(){
    if(this.gameDealSorted != undefined){
      let queryUrl : string =  ""

      let inputArrRaw = Object.entries(this.searchTerm).map(([key, value]) => [key, value])
      let inputArr = []
    
      // if there is a null value. Do not push it in inputArr
      for (let j =0; j<inputArrRaw.length; j++) {
        if( inputArrRaw[j][1] != null){
          inputArr.push(inputArrRaw[j])
        }
      }

      // create the query
      for (let i =0; i<inputArr.length; i++) {
        if (inputArr[i][0] == 'title')  queryUrl += `&title=${inputArr[i][1]}`
        if (inputArr[i][0] == 'recent')  queryUrl += "&sortBy=recent&desc=1"
        if (inputArr[i][0] == 'priceLessThan')  queryUrl += `&lowerPrice=${inputArr[i][1]}`
        if (inputArr[i][0] == 'priceMoreThan')  queryUrl += `&upperPrice=${inputArr[i][1]}`
        if (inputArr[i][0] == 'onSale')  queryUrl += "&onSale=1"
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
      case 'filter':
        break;
      // sort by deal or other wrong url
      default:
        this.sortByParam = "Sort By Deal"
        this.gameDealSorted = this.gameDeal
    }
  }

  goBack(): void {
    this.location.back();
  }

}
