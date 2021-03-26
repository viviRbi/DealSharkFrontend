import { ClientMessage } from './../../models/client-message.model';
import { LoginService } from './../../services/login.service';
import { IUserLoginTemplate } from './../../models/userLogin';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
  

  constructor(private loginService: LoginService) { }

  public clientMessage: ClientMessage = new ClientMessage('');


  userLogin?: IUserLoginTemplate = {username:"",password:""}
  message: String

  user?: User
   
  public loginUserFromService(): void {

    this.loginService.loginUser(this.userLogin).subscribe(data =>{
          // Wrong username and password case
        if (data == null || data.username == ""){
          //this.user = null
          console.log("Your username is incorrect")
          this.message= "Incorrect username or password"
        }else {
        // correct username and password
        console.log("Correct username/password. Here's the info for the user who logged in: " + JSON.stringify(this.user));
        // save to session
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        this.user = data
        this.message= "Successfully submited"
      }
    })
  }


}
