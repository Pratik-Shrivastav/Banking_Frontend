import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login', 
    pathMatch: 'full'
  },
  {
    path:"Login",
    loadChildren: ()=>import("./modules/login/login.module").then(m=>m.LoginModule),
  },
  {
    path:"Client",
    loadChildren: ()=>import("./modules/client/client.module").then(m=>m.ClientModule),
    canActivate: [authGuard],  // Apply the authGuard here
    data: { role: 'Client' }
  },
  {
    path:"SuperAdmin",
    loadChildren: ()=>import("./modules/super-admin/super-admin.module").then(m=>m.SuperAdminModule),
    canActivate: [authGuard],  // Apply the authGuard here
    data: { role: 'SuperAdmin' } 
  },
  {
    path:"Bank",
    loadChildren: ()=>import("./modules/bank/bank.module").then(m=>m.BankModule),
    canActivate: [authGuard],  // Apply the authGuard here
    data: { role: 'SuperAdmin' } 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
