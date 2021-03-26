import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { ClientMessage } from './../../models/client-message.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  title = 'Register User';

  constructor(private userService: UserService) { }

  public user: User = {
    id: 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    balance: 100
  };
  message : string

  ngOnInit(){
    console.log(this.user)
    if (this.user == null){
      console.log(null)
    }
  }

  public clientMessage : ClientMessage = new ClientMessage("");

  public registerUserFromService(): void {
    this.userService.registerUser(this.user).subscribe(data => {
      this.clientMessage = data
      this.message = "You have successfully create an account. Please log in"
    }, error => this.clientMessage.message = 'SOMETHING WENT WRONG IN REGISTER.TS')
  }

}
