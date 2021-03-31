

import { RegisterComponent } from './layout/register/register.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from "./routing-module/routing.module";
import { RoutingAuthModule } from "./routing-module/routing-auth.module";
import { RoutingStoreModule } from "./routing-module/routing-store.module";
import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { WelcomeComponent } from './layout/welcome/welcome.component';
import { LoginComponent } from './layout/login/login.component';
import { CheckoutComponent } from './layout/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    // divide routing module to diferent parts for easier control. RoutingModule had error page. It should be the least hierachy or else every route aside welcome will become error page

    RoutingAuthModule,   // user path like login, register
    RoutingStoreModule,   // store related like checkout
    RoutingModule,       // welcome page or error page, also user and game lazy loading

    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
