
import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { IGameInfo } from 'src/app/models/gameModel';
import { LoginService } from 'src/app/services/login.service';
import { ParentChildCommuteService } from 'src/app/services/parent-child-commute.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //addToCart? : IGameInfo[] =[]
  //addToSave? : IGameInfo[] =[]
  inCartNumber?: number =0
  savedGameNumber?: number =0

  constructor(public loginService: LoginService, private parentChildCommute : ParentChildCommuteService) {

   }

  ngOnInit(): void{
    // Get the length of item as soon as the page load
    //---------- Connect to database, if there's no session look to the database and query it
    this.checkSession()

    // Passing value from a shared service. Update immediately
    this.parentChildCommute.changeSaveEmitted$.subscribe(data => {
      this.savedGameNumber = data; 
    })
    
    this.parentChildCommute.changeCartEmitted$.subscribe(data => {
      this.inCartNumber = data; 
    })

  }

  checkSession(){
   this.inCartNumber = Boolean(sessionStorage.getItem('cartItem'))== true ? JSON.parse(sessionStorage.getItem('cartItem')).length : 0
   this.savedGameNumber = Boolean(sessionStorage.getItem('savedItem'))== true ?JSON.parse(sessionStorage.getItem('savedItem')).length : 0
  }


  logout(){
    this.loginService.logoutUser()
  }

  


}
