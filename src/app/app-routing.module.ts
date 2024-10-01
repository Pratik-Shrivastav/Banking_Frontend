import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Login', 
    pathMatch: 'full'
  },
  {
    path:"Login",
    loadChildren: ()=>import("./modules/login/login.module").then(m=>m.LoginModule)
  },
  {
    path:"Client",
    loadChildren: ()=>import("./modules/client/client.module").then(m=>m.ClientModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
