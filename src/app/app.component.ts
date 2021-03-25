import { Component} from '@angular/core';
import { IGameInfo } from './models/gameModel';
import { ParentChildCommuteService } from './services/parent-child-commute.service';

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


  constructor(private parentChildCommute: ParentChildCommuteService){
    parentChildCommute.changeSaveEmitted$.subscribe(data => this.addGameToSave = data)
    parentChildCommute.changeCartEmitted$.subscribe(data => this.addGameToCart = data)
  }
  
    
}
