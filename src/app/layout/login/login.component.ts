import { ClientMessage } from './../../models/client-message.model';
import { LoginService } from './../../services/login.service';
import { IUserLoginTemplate } from './../../models/userLogin';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
  

  constructor(private loginService: LoginService,  private router: Router, private route: ActivatedRoute) { }

  public clientMessage: ClientMessage = new ClientMessage('');


  userLogin?: IUserLoginTemplate = {username:"",password:""}
  errMessage: String
  user?: User
  mouseoverLogin : boolean // Use for template form to catch mouse over and mouse leave event to display form error
   
  public loginUserFromService(): void {

    this.loginService.loginUser(this.userLogin).subscribe(data =>{
        // Wrong username and password case
      if (data == null || data.username == ""){
        this.errMessage= "Incorrect username or password"
      }else { 
        this.user = data
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        console.log(this.user)
        this.router.navigateByUrl(HttpParams['return']);
      }
    })
  }


}
