import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from '../layout/user/profile/profile.component';
import { OwnedGameComponent } from '../layout/user/owned-game/owned-game.component';
import { SavedGameComponent } from '../layout/user/saved-game/saved-game.component';

// Able to use user path for lazy loading if needed
const routes: Routes = [
    {path: '', component: ProfileComponent},
    {path: 'owned-game', component: OwnedGameComponent},
    {path: 'saved-game', component: SavedGameComponent},
    {path: 'profile', component: ProfileComponent}
  ];
  // Route guard will return not sign-in user to welcome page when acess /user path
  // canActivate: [AuthGuard]
  


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingUserModule { }
