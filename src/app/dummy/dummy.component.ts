import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { EmpDialogComponent } from '../user/emp-dialog/emp-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { state } from '@angular/animations';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent {

  public empDetails: any = [];
  emp: any;

  form: any = {
    fullname: '',
    mobnum: '',
    email: '',
    date: '',
    Gender: '',
    selectedCountry: '',
    selectedState: '',
    selectedCity: '',
  };

  // form: FormGroup;
  // Countries Url="  https://retoolapi.dev/LrORIQ/country ";
  // State Url=" https://retoolapi.dev/JCcONZ/state ";
  // City Url=" https://retoolapi.dev/2tExaA/citi " ;

  // CounytryList="  https://retoolapi.dev/dpg3sO/countryList "
  // StateList = " https://retoolapi.dev/qIlTnT/stateList "
  // CityList = " https://retoolapi.dev/lKoFF6/cityList"



  countries: any;
  states: any[] = [];
  stateList: any[] = [];
  city: any[] = [];
  cities: any;
  selectedCountry: any;
  selectedCity: any;
  selectedState: any;
  citiList: any;
  States: any[] = [];
  filteredStates: any[] = [];
  filteredCities: any;
  selectedCountryId: any;
  selectedCityId: any;

  hideRegisterForm: boolean = true;
  hideEmployeeDetails: boolean = false;
  dialogVisible: boolean = false;
  mobileNumberPattern = /^[0-9]{10}$/;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  displayedColumns: string[] = ['id', 'empname', 'date', 'mobnum', 'Gender', 'address', 'selectedCountry', 'selectedState', 'selectedCity'];
  paginator: any;
  sort: any;



  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private matDialog: MatDialog) {
    this.form = this.formBuilder.group({

      selectedCountry: [''],
      selectedState: [''],
      selectedCity: [''],
      fullname: ['', Validators.required],
      mobnum: ['', Validators.required],
      email: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      Gender: ['', Validators.required],

    });

    this.fetchCountryData();
  }
  fetchCountryData() {

    this.httpClient.get('https://retoolapi.dev/LrORIQ/country').subscribe((data: any) => {
      const responseData = data[0];
      this.countries = responseData.countries;
      // console.log(this.countries)
    });

    this.httpClient.get('https://retoolapi.dev/JCcONZ/state').subscribe((data: any) => {
      const responseData = data[0];
      this.stateList = responseData.States;
      // console.log(this.stateList)
    });

    this.httpClient.get('https://retoolapi.dev/2tExaA/citi').subscribe((data: any) => {
      const responseData = data[0];
      this.citiList = responseData.cities;
      // console.log(this.citiList)

    })
  }

  filteredStatesList() {

    // this.filteredStates = this.stateList.filter(state => state.countryid === selectedCountryId);
  }


  onCountryChange(event: any) {


    const selectedCountry = this.form.value.selectedCountry;
    // console.log(selectedCountry);

    const countryData = this.countries.find((country: { name: any; }) => country.name === selectedCountry);
    // console.log(countryData)

    const selectedCountryId = countryData.countryid;
    // console.log(selectedCountryId);

    this.filteredStates = this.stateList.filter(state => state.countryid === selectedCountryId);

    this.states = countryData ? countryData.states : [];
    this.form.patchValue({ selectedState: '' });
    this.city = [];
    if (countryData) {
      this.states = countryData.states;
      this.form.controls['selectedCity'].reset();
      this.city = [];
    } else {
      this.states = [];


    }
    this.filteredCities = [];
    this.city = [];
  }

  onStateChange(event: any) {
    // const selectedCountry = this.form.value.selectedCountry;
    // const selectedState = this.form.value.selectedState;
    // const stateData = this.stateList.find((city: { name: any; }) => city.name === selectedState);
    // const selectedStateId = stateData.stateid;
    // this.filteredCities = this.citiList.filter((city: any) => city.stateid === selectedStateId && city.countryid===this.selectedCountryId);
    // const countryData = this.countries.find((country: { name: any; }) => country.name === selectedCountry);
    // this.cities = stateData ? stateData.states : [];

    // this.form.patchValue({ selectedCity: '' });
    // this.city = [];
    // if (stateData) {
    //   this.city = stateData.states;
    //   // this.city=countryData.countries;
    //   // this.city = [];

    // } else {
    //   this.city = [];
    // }


    // const selectedCountry = this.form.value.selectedCountry;
    // const selectedState = this.form.value.selectedState;
    // const stateData = this.stateList.find((state: { name: any; }) => state.name === selectedState);

    // const countryData = this.countries.find((country: { name: any; }) => country.name === selectedCountry);

    // if (countryData) {

    //   const selectedCountryId = countryData.countryid;
    //   this.filteredStates = this.stateList.filter(state => state.countryid === selectedCountryId);

    //   if (stateData) {
    //     const selectedStateId = stateData.stateid;

    //     // Filter cities by both state ID and country ID
    //     this.filteredCities = this.citiList.filter((city: any) => city.stateid === selectedStateId);

    //     // Reset city dropdown
    //     this.form.patchValue({ selectedCity: '' });
    //     this.city = [];
    //   }


    // } else {
    //   // Handle the case when state data is not found
    //   this.filteredCities = [];
    //   this.form.patchValue({ selectedCity: '' });
    //   this.city = [];
    // }

    const selectedCountry = this.form.value.selectedCountry;
    const selectedState = this.form.value.selectedState;

    // Find the selected state data
    const stateData = this.stateList.find((state: { name: any; }) => state.name === selectedState);

    // Find the selected country data
    const countryData = this.countries.find((country: { name: any; }) => country.name === selectedCountry);

    // If country data is found
    if (countryData) {
      const selectedCountryId = countryData.countryid;

      // Filter states based on the selected country
      this.filteredStates = this.stateList.filter(state => state.countryid === selectedCountryId);

      // If state data is found
      if (stateData) {
        const selectedStateId = stateData.stateid;

        // Filter cities by both state ID and country ID
        this.filteredCities = this.citiList.filter((city: any) => city.stateid === selectedStateId && city.countryid === selectedCountryId);

        // Reset city dropdown
        this.form.patchValue({ selectedCity: '' });
        this.city = [];
      } else {
        // Reset city dropdown if no state data is found
        this.filteredCities = [];
        this.form.patchValue({ selectedCity: '' });
        this.city = [];
      }
    } else {
      // Reset state and city dropdowns if no country data is found
      this.filteredStates = [];
      this.filteredCities = [];
      this.form.patchValue({ selectedState: '', selectedCity: '' });
      this.city = [];
    }

  }

  onCityChange(event: MatSelectChange) {
    // const selectedCity = this.form.value.selectedCity;
    // console.log(selectedCity)

    // const cityData = this.citiList.find((city: { name: any; }) => city.name === selectedCity);
    // console.log(cityData)

    // const selectedCityId=cityData.stateid;
    // console.log(selectedCityId)
    // // const selectedCityId1=cityData.countryid;
    // // console.log(selectedCityId1)


    // this.filteredCities = this.citiList.filter((city: any) => city.stateid === selectedCityId);
    // console.log(this.filteredCities)

    // if (cityData) {
    //   this.city = selectedCity.cities;
    // } else {
    //   this.city = [];
    // }

  }

  onSubmit() {

    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData)
      this.httpClient.post('https://retoolapi.dev/lcqe0N/empData', formData)
        .subscribe(data => {
          alert("Register Successfully")

          this.hideRegisterForm = false;
          this.hideEmployeeDetails = true;


        }, error => {
        });
    } else {
      alert("Need to Fill All Fields...")
    }
  }
  // ngAfterViewInit() {
  //   this.empDetails.paginator = this.paginator;
  //   this.empDetails.sort = this.sort;
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empDetails.filter = filterValue.trim().toLowerCase();

    if (this.empDetails.paginator) {
      this.empDetails.paginator.firstPage();
    }
  }

  onReset(form: NgForm): void {
    form.reset();
  }


  addEmployee() {
    this.hideRegisterForm = true;
    this.hideEmployeeDetails = false;
  }


  ngOnInit() {

    this.httpClient.get('https://retoolapi.dev/lcqe0N/empData').subscribe((data: any) => {
      this.empDetails = data;
      // console.log(this.empDetails)

    });

  }

  onDialog() {
    this.hideRegisterForm = true;
    this.dialogVisible = true;
    this.matDialog.open(DummyComponent, {
      width: 'fit-content',
      height: 'fit-content'

    });
    this.httpClient.get('https://retoolapi.dev/lcqe0N/empData').subscribe((data: any) => {
      const responsedata = data;
      console.log(responsedata);

    })
  }
}
