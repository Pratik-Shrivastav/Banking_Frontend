import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Login } from '../../../../models/login';
import { LoginResponse } from '../../../../models/login-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;

      this.loginService.login(loginData).subscribe(
        (response: LoginResponse) => {
          console.log(response);
          if (response.role == "SuperAdmin") {
            localStorage.setItem("Token", response.token);
            this.router.navigate(['SuperAdmin']);
          }
          else {
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
                    this.router.navigate(['Document'])
                  }
                  else {
                    this.router.navigate(['DocumentDisplay'])
                  }
                }
              )
            }
            else {
              console.log("Rejected");

            }

          }
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }

}
