
import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { IGameInfo } from 'src/app/models/gameModel';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  @Input('addGameToCart') addToCart : IGameInfo
  inCartNumber?: number
  savedGameNumber?: number

  constructor(public loginService: LoginService) { }

  ngOnInit(): void{
  }
// Use DoCheck because OnChanges only when primitive data change
  ngDoCheck(){
    this.inCartNumber = Boolean(sessionStorage.getItem('cartItem'))== true ? JSON.parse(sessionStorage.getItem('cartItem')).length : 0
    this.savedGameNumber = Boolean(sessionStorage.getItem('savedItem'))== true ?JSON.parse(sessionStorage.getItem('savedItem')).length : 0
    //console.log(this.inCartNumber, this.savedGameNumber)
  }

  logout(){
    this.loginService.logoutUser()
  }

  


}
