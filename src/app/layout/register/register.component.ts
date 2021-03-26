import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { ClientMessage } from './../../models/client-message.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  title = 'Register User';

  constructor(private userService: UserService) { }

  public user: User = new User(0, '', '', '', '', 100, '', '');

  public clientMessage : ClientMessage = new ClientMessage("");

  public registerUserFromService(): void {
    this.userService.registerUser(this.user).subscribe(data => this.clientMessage = data, error => this.clientMessage.message = 'SOMETHING WENT WRONG IN REGISTER.TS')
  }

}
