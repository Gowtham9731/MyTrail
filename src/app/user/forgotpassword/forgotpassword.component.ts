import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

  // forgotForm: FormGroup;
  // showOTPInput: boolean = false;
  // hideMailId: boolean = true;
  // defaultEmail: string = 'asdf@gmail.com';
  // generatedOTP: string = '';

  // // enteredOTP: string = '';
  // enterOTP:string='';
  // isOTPVerified: boolean = false;
  // router: any;
  
  // constructor(private fb: FormBuilder) {
  //   this.forgotForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     otp: ['', [Validators.required, Validators.minLength(6)]]
  //   });
  // }

  // submit() {
  //   if (this.defaultEmail === this.forgotForm.value.email) {
  //     this.showOTPInput = true;
  //     this.generatedOTP = this.generateOTP();

  //   } else {
  //     this.markFormGroupTouched(this.forgotForm);
  //   }

  // }

  // markFormGroupTouched(formGroup: FormGroup) {
  //   Object.values(formGroup.controls).forEach(control => {
  //     control.markAsTouched();

  //     if (control instanceof FormGroup) {
  //       this.markFormGroupTouched(control);
  //     }
  //   });
  // }

  // generateOTP(): string {
      
  //   const length = 6;
  //   const characters = '0123456789';
  //   let otp = '';

  //   for (let i = 0; i < length; i++) {
  //     const index = Math.floor(Math.random() * characters.length);
  //     otp += characters[index];
  //   }
  //   return otp;
    
  // }

  // verifyOTP() {

   
  //     if (this.enterOTP === this.generatedOTP) {
  //       this.router.navigate(['/newpass']);
  //       this.isOTPVerified = true;
  //       this.showOTPInput = false;
  //       this.hideMailId=false;
        
  //     }
  // }


  forgotForm: FormGroup;
  showOTPInput: boolean = false;
  hideMailId: boolean = true;
  defaultEmail: string = 'asdf@gmail.com';
  generatedOTP: string = '';
  enterOTP: string = '';
  isOTPVerified: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      enterOTP: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.defaultEmail === this.forgotForm.value.email) {
      this.showOTPInput = true;
      this.generatedOTP = this.generateOTP();
      
    } else {
      this.markFormGroupTouched(this.forgotForm);
    }
    this.verifyOTP();
  }
  

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  generateOTP(): string {
    const length = 6;
    const characters = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      otp += characters[index];
    }
    return otp;
  }

  verifyOTP() {
    if (this.enterOTP === this.generatedOTP) {
      this.router.navigate(['/newpass']);
      this.isOTPVerified = true;
      this.showOTPInput = false;
      this.hideMailId = false;
    }
  }
}



