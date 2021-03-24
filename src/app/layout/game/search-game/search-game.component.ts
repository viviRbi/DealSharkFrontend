import { Component, OnInit } from '@angular/core';
import { ISearchGame } from '../../../models/searchGame';

@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.css']
})
export class SearchGameComponent implements OnInit {

  searchTerm : ISearchGame = {
    title: null,
    recent: null,
    priceLessThan: null,
    priceMoreThan: null,
    AAA: null,
    onSale: null
  }

  constructor() { }

  ngOnInit(): void {
  }

}
