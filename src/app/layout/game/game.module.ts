
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameListComponent } from './game-list/game-list.component';
import { RoutingGameModule } from 'src/app/routing-module/routing-game.module';
import { SearchGameComponent } from './search-game/search-game.component';




@NgModule({
  declarations: [
    GameListComponent,
    GameDetailComponent,
    SearchGameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RoutingGameModule
  ]
})
export class GameModule { }
