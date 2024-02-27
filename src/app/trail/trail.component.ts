import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trail',
  templateUrl: './trail.component.html',
  styleUrls: ['./trail.component.scss']
})
export class TrailComponent implements OnInit {


  trailForm: FormGroup;
  countries: any;
  countriesList: any;
  stateList: any;
  countryList: any;
  filteredStates: any;
  state: any;
  cityList: any;
  city: any;
  filteredCities: any;
  constructor(private common: CommonService, private fb: FormBuilder, private httpClient: HttpClient) {

    this.trailForm = this.fb.group({

      selectedCountry: [''],
      selectedState: [''],
      selectedCity: [''],

    });
    // this.common.getCountryData().subscribe((data: any) => {
    //   this.countryList = data;
    //   console.log(this.countryList)

    // });
    // this.common.fetchCountryData();
    // this.common.fetchStateData();

  }

  // Api Urls : 
  // CountryName = "https://retoolapi.dev/LrORIQ/country" ,
  // stateName =" https://retoolapi.dev/qIlTnT/stateList " ,
  // CityName = " https://retoolapi.dev/lKoFF6/cityList "


  ngOnInit() {

    this.common.getCountryData().subscribe((data: any) => {
      this.countryList = data;
      console.log(this.countryList)

    });

    this.common.getStateData().subscribe((data: any) => {
      this.stateList = data;
      console.log(this.countryList)

    });

    this.common.getCityData().subscribe((data: any) => {
      this.cityList = data;
      console.log(this.countryList)

    });

    

  }


  // onCounrtyChange(event: any) {

  //   const selectedCountry = event.value; 
  //   console.log(selectedCountry);

  //   const countryData = this.countryList.find((country: {
  //     countryname: any; name: any;
  //   }) => country.countryname === selectedCountry);
  //   console.log(countryData);

  //   if (countryData) {
  //     this.filteredStates = this.common.filterStatesByCountry(countryData);
  //     this.state = countryData.states;
  //     this.userReg.patchValue({ selectedState: '' });
  //     this.city = [];
  //     this.userReg.controls['selectedCity'].reset();
  //   } else {
  //     this.state = [];
  //     this.filteredStates = [];
  //     this.userReg.patchValue({ selectedState: '' });
  //     this.city = [];
  //     this.userReg.controls['selectedCity'].reset();
  //   }




  // }
  
  // onCountryChange(event: any) {
  //   const selectedCountry = event.value;
  //   console.log(selectedCountry);

   

  //   const countryData = this.countryList.find((country: { countryname: any; }) => country.countryname === selectedCountry);
  //   console.log(countryData);

  //   this.filteredStates = this.stateList.filter((state: {countryname: any;}) => state.countryname === selectedCountry);
  //   console.log(this.filteredStates)

  //   this.trailForm.patchValue({ selectedState: '' });
  //   this.city = [];
  //   if (countryData) {
  //     this.state = countryData.states;
  //     this.trailForm.controls['selectedCity'].reset();
  //     this.city = [];
  //   } else {
  //     this.state = [];


  //   }
  //   this.filteredCities = [];
  //   this.city = [];

    

  // }


  onCountryChange(event: any) {
    const selectedCountry = event.value;
    console.log(selectedCountry);

    const countryData = this.getCountryData(selectedCountry);
    console.log(countryData);

    this.filteredStates = this.getFilteredStates(selectedCountry);
    console.log(this.filteredStates);

    // this.resetFormControls();
    // this.updateStateAndCity(countryData);
    
}

getCountryData(selectedCountry: any): any {
  return this.countryList.find((country: { countryname: any; }) => country.countryname === selectedCountry);
}


getFilteredStates(selectedCountry: any): any[] {
  return this.stateList.filter((state: { countryname: any; }) => state.countryname === selectedCountry);
}


resetFormControls(): void {
  this.trailForm.patchValue({ selectedState: '' });
  this.city = [];
  this.filteredCities = [];
  this.city = [];
}

 updateStateAndCity(countryData: any): void {
  if (countryData) {
      this.state = countryData.states;
      this.trailForm.controls['selectedCity'].reset();
      this.city = [];
  } else {
      this.state = [];
  }
}

  
  onStateChange(event:any) {

    

    const selectedState = this.trailForm.value.selectedState;
    // console.log(selectedState)
    const stateNameArray = selectedState.stateName;

    // // Loop through the 'stateName' array to get individual state names
    // stateNameArray.forEach((state: any) => {
    //   console.log(state); // This will log each state name to the console
    // });


  }
}
