import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Register } from '../../../../models/register';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  isLinear = false;
  companyFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  accountFormGroup: FormGroup;
  userFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _service:LoginService, private router:Router) {
    // Form for company details
    this.companyFormGroup = this._formBuilder.group({
      founderName: ['', Validators.required],
      companyName: ['', Validators.required],
      phone: ['', Validators.required]
    });

    // Form for address details
    this.addressFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });

    // Form for account details
    this.accountFormGroup = this._formBuilder.group({
      accountNumber: ['', Validators.required, this._service.validateAccountNumber()],
      ifsc: ['', Validators.required],
      branch: ['', Validators.required]
    });

    this.userFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userName: ['', Validators.required,this._service.validateUsername()]
    });
  }

  onSubmit() {
    const registerObject: Register = {
      founderName: this.companyFormGroup.value.founderName,
      companyName: this.companyFormGroup.value.companyName, 
      address: this.addressFormGroup.value.address, 
      city: this.addressFormGroup.value.city,
      region: this.addressFormGroup.value.region,
      postalCode: this.addressFormGroup.value.postalCode,
      country: this.addressFormGroup.value.country,
      phone: this.companyFormGroup.value.phone,
      email: this.userFormGroup.value.email,
      password: this.userFormGroup.value.password,
      role: "Client",
      userName: this.userFormGroup.value.userName,
      accountNumber:this.accountFormGroup.value.accountNumber,
      ifsc: this.accountFormGroup.value.ifsc,
      branch: this.accountFormGroup.value.branch
    };
    this._service.Register(registerObject).subscribe(
      response => {
        // Handle success response
        console.log('Registration successful:', response);
        // Optionally navigate to another page or show a success message
      },
      error => {
        // Handle error response
        console.error('Registration failed:', error);
      }
    )

    this.router.navigate(['Login']);

  }

}
