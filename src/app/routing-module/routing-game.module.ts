import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GameListComponent } from '../layout/game/game-list/game-list.component';
import { GameDetailComponent } from '../layout/game/game-detail/game-detail.component';

const routes: Routes = [
  {path: ':sortBy', component: GameListComponent},
  {path: '', component: GameListComponent},
  {path: 'game-detail', component: GameDetailComponent}
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
