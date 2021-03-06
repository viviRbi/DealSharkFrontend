import { UserModule } from './../layout/user/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../layout/welcome/welcome.component';
import { NotFoundPageComponent } from '../layout/not-found-page/not-found-page.component';
import { Browser } from 'selenium-webdriver';

// This is for global route

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},

  // -----------------Lazy Loading
  {path: 'user', 
  // Add Auth Guard to kick user out if they haven't login using CanLoad: [activate gruard name] 
  //To create a guard: ng g g folder/guardName. Open the file, implements CanActivate interface
  loadChildren: () => import('../layout/user/user.module').then(m=>m.UserModule)},

  {path: 'game', loadChildren: () => import('../layout/game/game.module').then(m=>m.GameModule)},
  // -------------------End Lazy Loading

  {path:'', redirectTo: '/welcome', pathMatch: 'full'},
  {path:'**', component: NotFoundPageComponent},             // ** = path not found

  //{ path: 'register', loadChildren: () => import('../layout/register/register.module').then(m=>m.AuthModule)},
  {path:'', redirectTo: '/welcome', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  //exports: [RouterModule]
})
export class RoutingModule { }
