import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingUserModule } from '../../routing-module/routing-user.module';
import { ProfileComponent } from './profile/profile.component';
import { OwnedGameComponent } from './owned-game/owned-game.component';
import { SavedGameComponent } from './saved-game/saved-game.component';



@NgModule({
  declarations: [
    OwnedGameComponent,
    SavedGameComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RoutingUserModule
  ],

})
export class UserModule { }
