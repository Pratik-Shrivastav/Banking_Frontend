import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Login } from '../../../../models/login';
import { LoginResponse } from '../../../../models/login-response';
import { Router } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {

  loginForm: FormGroup;
  recaptchaResponse: string | undefined;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,private toastService: ToastService) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  handleSuccess(captchaResponse: string) {
    this.recaptchaResponse = captchaResponse; // Store the captcha response
    console.log(`Captcha resolved with response: ${this.recaptchaResponse}`);
    this.loginForm.patchValue({ recaptcha: this.recaptchaResponse }); // Update the form control
  }

  resolved(captchaResponse: any) {
    this.recaptchaResponse = captchaResponse;
    console.log(`Resolved captcha with response: ${this.recaptchaResponse}`);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;

      this.loginService.login(loginData).subscribe(
        (response: LoginResponse) => {
          console.log(response);
          if (response.role == "SuperAdmin"&& response.status == "Success") {
            localStorage.setItem("Token", response.token);
            this.router.navigate(['SuperAdmin']);
          }
          else if(response.role == "Bank" && response.status == "Success"){
            localStorage.setItem("Token", response.token);
            this.router.navigate(['Bank']);
          }
          else 
          {
            localStorage.setItem("companyName",response.userName);
            if (response.success && response.status == "Success") {
              console.log('Login successful!', response);
              localStorage.setItem("Token", response.token);
              this.router.navigate(['Client'])
            }
            else if (response.success && response.status == "Pending") {
              console.log("Pending");
              localStorage.setItem("Token", response.token);
              this.loginService.getUser().subscribe(
                (response) => {
                  if ((response.clientObject.documentList).length == 0) {
                    this.router.navigate(['Login/Document'])
                  }
                  else {
                    this.router.navigate(['Login/DocumentDisplay'])
                  }
                }
              )
            }
            else if(response.success && response.status == "Rejected"){
              this.router.navigate(['Login/RejectedDisplay'])
              localStorage.setItem("Token", response.token);
            }
            else {
              this.toastService.showToast(response.message);
            }

          }
        },
        error => {
          this.toastService.showToast('Login failed');
          console.error('Login failed', error);
        }
      );
    }
  }
  navigateToForgotPassword() {
    this.router.navigate(['Login/ForgotPassword']);
    }
  

}
