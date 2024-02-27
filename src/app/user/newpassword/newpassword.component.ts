import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent {

  ngForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ngForm = this.fb.group({
      createpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const createPassword = control.get('createpassword');
    const confirmPassword = control.get('confirmpassword');

    // if (createPassword.value !== confirmPassword.value) {
    //   return { 'passwordMismatch': true };
    // }

    return null;
  }

  onSubmit() {
    // Form submission logic
  }

  // ngForm: FormGroup;

  // constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
  //   this.ngForm = this.formBuilder.group({
  //     createpassword: [''],
  //     confirmpassword: [''],
  //   })
  // }


  // onSubmit() {
  //   // if (form.valid) {
  //   //   console.log(form.value);
  //   // } else {
  //   //   console.log('Form is invalid');
  //   // }
  // }
}
