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

  userLogin: IUserLoginTemplate = {username:"",password:""}
   
  public registerUserFromService(): void {

    this.loginService.loginUser(this.userLogin).subscribe(data => this.userLogin = data, 
      error => this.clientMessage.message = 'SOMETHING WENT WRONG!');

      console.log("Here's the userLogin object: " + this.userLogin);
  }

  
consoleUser(){
  console.log(this.userLogin)
}


  // Constructor Injection


  // For databinding
  /* ..... 

  console.log("send login triggered");

    let uName = document.getElementById('uName').value;

    let pWord = document.getElementById('pWord').value;

    console.log(`Username: ${uName}`);
    console.log("testing");
    console.log(`Password: ${pWord}`);

    let loginTemplate = {
        username: uName,
        password: pWord
    }
*/

  // Client message to the user

  /*
  public clientMessage: ClientMessage = new ClientMessage('');

  public loginUserFromService(loginTemplate): void {

    this.userService.loginUser(this.hero).subscribe(data => this.clientMessage = data, 
      
      error => this.clientMessage.message = 'SOMETHING WENT WRONG!');
      */
  }
