import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DocumentComponent } from './components/document/document.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DocumentDisplayComponent } from './components/document-display/document-display.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    DocumentComponent,
    DocumentDisplayComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ]
})
export class LoginModule { }
