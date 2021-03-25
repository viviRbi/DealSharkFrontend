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
  err: String

  user?: User
   
  public registerUserFromService(): void {

    this.loginService.loginUser(this.userLogin).subscribe(data =>this.user = data);
    // Wrong username and password case
    if (this.user == null){
      //this.user = null
      console.log("Your username is incorrect")
      this.err= "Incorrect username or password"
    }
 else {
   // correct username and password
   // save to session
 }    
  }



    


  }
