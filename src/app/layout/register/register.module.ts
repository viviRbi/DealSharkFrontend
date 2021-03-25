import { RoutingRegisterModule } from './../../routing-module/routing-register.module';
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
    declarations: [
      RegisterComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      RoutingRegisterModule
    ]
  })
  export class RegisterModule { }