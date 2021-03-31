
import { Component, OnInit, DoCheck, Input, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ParentChildCommuteService } from "../../services/parent-child-commute.service";
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , OnDestroy{

  inCartNumber?: number =0
  savedGameNumber?: number =0
  loggedIn: Boolean = false

  savedGameId?: string

  sub: Subscription;

  constructor(public loginService: LoginService, private parentChildCommute : ParentChildCommuteService, private userService: UserService) {

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

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  checkSession(){
    Boolean(sessionStorage.getItem(environment.sessionNameForSave))== true ?console.log("save session",JSON.parse(sessionStorage.getItem(environment.sessionNameForSave)).length) : null
   this.inCartNumber = Boolean(sessionStorage.getItem(environment.sessionNameForCart))== true ? JSON.parse(sessionStorage.getItem(environment.sessionNameForCart)).length : 0
   this.savedGameNumber = Boolean(sessionStorage.getItem(environment.sessionNameForSave))== true ?JSON.parse(sessionStorage.getItem(environment.sessionNameForSave)).length : 0
  }


  logout(){
    if (Boolean(sessionStorage.getItem(environment.sessionNameForSave))== true){
      this.sub = this.userService.updateSavedGame().subscribe(data => {this.savedGameId = data; console.log("saving these id", data) })
      sessionStorage.removeItem(environment.sessionNameForSave)
    }
    this.loginService.logoutUser()
  }

  


}
