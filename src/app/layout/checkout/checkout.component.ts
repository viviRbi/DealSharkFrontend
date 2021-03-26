import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment"

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  viewSessionStorage() {
    var session = JSON.parse(sessionStorage.getItem(environment.sessionNameForCart));
    console.log("here's what's in session name:")
    console.log(session)
}
}


