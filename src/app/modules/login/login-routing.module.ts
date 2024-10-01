import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { DocumentComponent } from './components/document/document.component';

const routes: Routes = [
  {
    path:"",component:LoginPageComponent
  },
  {
    path:"Register", component:RegisterPageComponent
  },
  {
    path:"Document", component:DocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
