import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { ForgotPasswordDto } from '../../../../models/ForgotPasswordDto';
import { VerifyOtpDto } from '../../../../models/VerifyOtp';
import { ResetPasswordDto } from '../../../../models/ResetPassword';
import { ToastService } from '../../../../service/toast.service'; // Assuming you have a toast service for notifications
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'], // Corrected styleUrl to styleUrls
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  verifyOtpForm: FormGroup;
  resetPasswordForm: FormGroup;
  currentStep: number = 1; // To manage the steps of the forgot password flow

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastService: ToastService,
    private router:Router
  ) {
    // Form for requesting OTP
    this.forgotPasswordForm = this.fb.group({
      username: ['', Validators.required],
    });

    // Form for OTP verification
    this.verifyOtpForm = this.fb.group({
      otp: ['', Validators.required],
    });

    // Form for resetting the password
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  requestOtp() {
    const forgotPasswordDto: ForgotPasswordDto = { username: this.forgotPasswordForm.value.username };
    this.loginService.forgotPassword(forgotPasswordDto).subscribe(
      (response) => {
        console.log(response);
        
        this.toastService.showToast('OTP sent to your email');
        this.currentStep = 2; 
      },
      (error) => {
        this.toastService.showToast('Error sending OTP');
        console.error('Error:', error);
      }
    );
  }

  verifyOtp() {
    const verifyOtpDto: VerifyOtpDto = {
      username: this.forgotPasswordForm.value.username,
      otp: this.verifyOtpForm.value.otp,
    };
    this.loginService.verifyOtp(verifyOtpDto).subscribe(
      (response) => {
        this.toastService.showToast('OTP verified successfully');
        this.currentStep = 3; // Move to reset password step
      },
      (error) => {
        this.toastService.showToast('OTP verification failed');
        console.error('Error:', error);
      }
    );
  }

  resetPassword() {
    const resetPasswordDto: ResetPasswordDto = {
      username: this.forgotPasswordForm.value.username,
      newPassword: this.resetPasswordForm.value.newPassword,
    };
    this.loginService.resetPassword(resetPasswordDto).subscribe(
      (response) => {
        console.log(response);
        
        this.toastService.showToast('Password reset successfully');
        this.router.navigate(["Login"])
        // Optionally redirect to login or another page
      },
      (error) => {
        this.toastService.showToast('Error resetting password');
        console.error('Error:', error);
      }
    );
  }
}
