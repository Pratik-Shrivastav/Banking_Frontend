import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { DocumentComponent } from './components/document/document.component';
import { DocumentDisplayComponent } from './components/document-display/document-display.component';
import { authGuard } from '../../authentication/auth.guard';
import { RejectedDocumentsComponent } from './components/rejected-documents/rejected-documents.component';

const routes: Routes = [
  {
    path:"",component:LoginPageComponent
  },
  {
    path:"Register", component:RegisterPageComponent
  },
  {
    path:"Document", component:DocumentComponent,
    canActivate: [authGuard],  // Apply the authGuard here
    data: { role: 'Client' }
  },
  {
    path:"DocumentDisplay", component:DocumentDisplayComponent,
    canActivate: [authGuard],  // Apply the authGuard here
    data: { role: 'Client' }
  },
  {
    path:"RejectedDisplay", component:RejectedDocumentsComponent,
    canActivate: [authGuard],  // Apply the authGuard here
    data: { role: 'Client' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
