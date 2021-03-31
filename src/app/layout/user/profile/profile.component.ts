import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }
  
  public user: User = {
    id: 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    balance: 100
  };
  message: string;
  errMessage: string;

  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  ID = this.currentUser.id;

  mouseoverUpdate : boolean

  ngOnInit(): void {
    this.getUserData()
  }

  public clientMessage : ClientMessage = new ClientMessage("");

  public updateUser(): void {
    this.user.id = this.ID;
    console.log("Here is the updated user: " + this.user)
    this.userService.updateUser(this.user).subscribe(data => {
      this.clientMessage = data
      if (data != null){
        console.log(data)
        this.message = "You have successfully updated your account. Click here to sign in"
        console.log("Here is your new user for session storage : " + this.user.firstName);
        sessionStorage.setItem(environment.sessionUser, JSON.stringify(this.user));
      }else 
        this.errMessage = "Something had gone wrong at the backend or you have been disconnect to our server"
    }, error => this.clientMessage.message = 'SOMETHING WENT WRONG IN REGISTER.TS')
  }

  getUserData(){
    let userData = JSON.parse(sessionStorage.getItem('currentUser'))
    this.user = userData
  }

}





