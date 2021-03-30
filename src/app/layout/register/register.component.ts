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
  errMessage : string
  // Use for template form to catch mouse over and mouse leave event to display form error
  mouseoverRegister : boolean

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
      if (data != null){
        console.log(data)
        this.message = "You have successfully create an account. Please log in"
      }else 
        this.errMessage = "Something had gone wrong at the backend. Please report"
    }, error => this.clientMessage.message = 'SOMETHING WENT WRONG IN REGISTER.TS')
  }

}
