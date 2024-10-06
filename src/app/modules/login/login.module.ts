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
import { NgxCaptchaModule } from 'ngx-captcha';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { RejectedDocumentsComponent } from './components/rejected-documents/rejected-documents.component';
import { MatSpinner } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    DocumentComponent,
    DocumentDisplayComponent,
    NavbarComponent,
    RejectedDocumentsComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    NgxCaptchaModule,
    MatIcon,
    MatSpinner
  ]
})
export class LoginModule { }
