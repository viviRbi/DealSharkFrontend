import { LoginService } from './../../services/login.service';
import { IUserLoginTemplate } from './../../models/userLogin';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {

  constructor(loginService: LoginService) { }


 

  



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
