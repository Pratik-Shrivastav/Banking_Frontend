import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Register } from '../../../../models/register';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../service/toast.service';

// Custom validator to check if forPayment and forSalary exceed a total of 100
export function paymentSalaryValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forPayment = control.get('forPayment')?.value;
    const forSalary = control.get('forSalary')?.value;

    // Ensure both fields are numbers
    const paymentAmount = Number(forPayment);
    const salaryAmount = Number(forSalary);

    // Check if the sum exceeds 100
    if (paymentAmount + salaryAmount > 100) {
      return { amountExceeded: true }; // Return an error if the sum exceeds 100
    }

    return null; // Return null if the validation passes
  };
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  isLinear = false;
  companyFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  accountFormGroup: FormGroup;
  userFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _service: LoginService, private router: Router, private _toastService: ToastService) {
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

    // Form for account details with custom validator
    this.accountFormGroup = this._formBuilder.group({
      accountNumber: ['', Validators.required],
      ifsc: ['', Validators.required],
      branch: ['', Validators.required],
      forPayment: ['', Validators.required],
      forSalary: ['', Validators.required]
    }, { validators: paymentSalaryValidator() });

    // Form for user details
    this.userFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userName: ['', Validators.required, this._service.validateUsername()]
    });
  }

  onSubmit() {
    console.log("reached sumit");
    if (this.accountFormGroup.invalid) {
      const errors = this.accountFormGroup.errors;
      if (errors?.['amountExceeded']) {
        this._toastService.showToast('The total of forPayment and forSalary must be less than 100.');
        return; // Prevent submission
      }
    }

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
      accountNumber: this.accountFormGroup.value.accountNumber,
      ifsc: this.accountFormGroup.value.ifsc,
      branch: this.accountFormGroup.value.branch,
      forPayment: this.accountFormGroup.value.forPayment,
      forSalary: this.accountFormGroup.value.forSalary
    };

    this._service.Register(registerObject).subscribe(
      response => {
        console.log('Registration successful:', response);
        this.router.navigate(['Login']);
      },
      error => {
        console.error('Registration failed:', error);
      }
    );
  }
}
