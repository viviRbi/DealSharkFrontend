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
  // Use for template form to catch mouse over and mouse leave event to display form error
  mouseoverLogin : boolean
   
  public loginUserFromService(): void {

    this.loginService.loginUser(this.userLogin).subscribe(data =>{
        // Wrong username and password case
      if (data == null || data.username == ""){
        //this.user = null
        console.log("Your username is incorrect")
        this.message= "Incorrect username or password"
      }else {
        
        this.user = data
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        console.log("Correct username/password. Here's the info for the user who logged in: " + this.user);
        this.message= "Successfully submited"
      }
    })
  }


}
