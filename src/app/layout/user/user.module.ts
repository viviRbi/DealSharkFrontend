import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingUserModule } from '../../routing-module/routing-user.module';

import { OwnedGameComponent } from './owned-game/owned-game.component';
import { SavedGameComponent } from './saved-game/saved-game.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OwnedGameComponent,
    SavedGameComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RoutingUserModule
  ],

})
export class UserModule { }
