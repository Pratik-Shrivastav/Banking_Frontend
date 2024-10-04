import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginModule } from './modules/login/login.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ClientModule } from './modules/client/client.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { BankModule } from './modules/bank/bank.module';
import { ToastComponent } from './components/toast/toast.component';
export function tokenGetter() {
  return localStorage.getItem('Token');
}
@NgModule({
  declarations: [
    AppComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LoginModule,
    ClientModule,
    SuperAdminModule,
    
    NgxCaptchaModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter, 
        allowedDomains: ['localhost:7005'],
        disallowedRoutes: [], 
      },
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
