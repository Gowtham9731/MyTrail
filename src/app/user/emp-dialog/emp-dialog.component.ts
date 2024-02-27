import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-emp-dialog',
  templateUrl: './emp-dialog.component.html',
  styleUrls: ['./emp-dialog.component.scss']
})
export class EmpDialogComponent {


  regform: FormGroup;

  countries: any[] = [];
  states: any[] = [];
  stateList:any[]=[];
  city: any[] = [];
  cities: any;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
    this.regform = this.formBuilder.group({
      selectedCountry: [''],
      selectedState: [''],
      selectedCity: [''],
      empname: ['', Validators.required],
      mobnum: ['', Validators.required],  
      // dob: ['', Validators.required],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.httpClient.get<any[]>('https://retoolapi.dev/IwOwmj/dummy').subscribe(data => {
      // Assuming your API response is an array with a single object
      const responseData = data[0];
      this.countries = responseData.countries;
      this.stateList = responseData.states;
      this.city=responseData.cities;
    });
  }

  onCountryChange(): void {
    const selectedCountry = this.regform.value.selectedCountry;
    const countryData = this.countries.find(country => country.name === selectedCountry);
    // console.log(countryData )
    this.states = countryData ? countryData.states : [];
    this.regform.patchValue({ selectedState: '' });
    this.cities = [];
    if (countryData) {
      this.states = countryData.states;
      this.city = []; 
    } else {
      this.states = [];
    }
  }
  
  onStateChange() {
    // const selectedCountry = this.regform.value.selectedCountry;
    const selectedState = this.regform.value.selectedState;
    console.log(selectedState, this.states)
    // this.states=this.selectedCountry.find()
    const city = this.stateList.find(state => state.name === selectedState);
    this.cities = city.city;
    console.log(city.city);
  }
  
  onSubmit(){
    if (this.regform.valid) {
      
      const formData = this.regform.value;
      this.httpClient.post('https://retoolapi.dev/lcqe0N/empData',formData)
        .subscribe(data => {
          alert("Register Successfully")
        }, error => {
        });
    } else {
      alert("Need to Fill All Fields...")
    }
  }
}

