import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GameListComponent } from '../layout/game/game-list/game-list.component';
import { SearchGameComponent } from '../layout/game/search-game/search-game.component';
import { GameDetailComponent } from '../layout/game/game-detail/game-detail.component';

const routes: Routes = [
  {path: ':sortBy', component: SearchGameComponent},
  {path: '', component: SearchGameComponent},
  {path: 'game-detail/:deal', component: GameDetailComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingGameModule { }
