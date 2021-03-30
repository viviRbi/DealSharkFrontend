import { Component} from '@angular/core';
import { IGameInfo } from './models/gameModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DealShark';
  addGameToSave? : IGameInfo;
  addGameToCart? : IGameInfo;
  alert? : string ;
  alertShow: boolean = true;


  constructor(){}
  
    
}
