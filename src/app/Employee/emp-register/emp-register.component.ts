import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { EmployeeService } from 'src/app/Services/empService';
import { UserRegisterComponent } from 'src/app/user/user-register/user-register.component';

@Component({
  selector: 'app-emp-register',
  templateUrl: './emp-register.component.html',
  styleUrls: ['./emp-register.component.scss']
})
export class EmpRegisterComponent implements OnInit {

  // CountryBy ID = " https://retoolapi.dev/crR0yX/CountryById "
  // StateBy ID =" https://retoolapi.dev/OUC7gb/stateById " 
  //  CityBy ID = " https://retoolapi.dev/h2f4j1/CityById "


  userReg: FormGroup;
  countries: any;
  stateList: any;
  citiList: any;
  employeeId: any;
  selectedCountry: any;
  name: string = '';
  // state: any;
  filteredStates: any;
  filteredCities: any;
  city: any;
  state: any;

  displayedColumns: string[] = ['id', 'empname', 'date', 'mobnum', 'Gender', 'address', 'selectedCountry', 'selectedState', 'selectedCity', 'action', 'delete'];
  employeeData: any;
  valueGet: any;



  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private router: Router,
    public activeRoute: ActivatedRoute,
    private common: CommonService,
    private empService: EmployeeService,
    // private dialogRef: MatDialogRef<UserRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.userReg = this.fb.group({
      fullname: ['', [Validators.required, Validators.maxLength(20)]],
      mobnum: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      address: ['', Validators.required],
      selectedCountry: ['', Validators.required],
      selectedState: ['', Validators.required],
      selectedCity: ['', Validators.required],
      Gender: ['', Validators.required],
      createPass: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      confirmPass: ['', [Validators.required, this.matchPasswords.bind(this)]]
    }, { validator: this.matchPasswords });

  }
  matchPasswords(formGroup: FormGroup) {
    const password = formGroup.get('createPass')?.value;
    const confirmPassword = formGroup.get('confirmPass')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPass')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPass')?.setErrors(null);
    }
  }

  ngOnInit() {

    this.activeRoute.params.subscribe((paramsId: any) => {
      this.employeeId = paramsId

      console.log(this.employeeId)
    })

    this.getEmployeDetails();


  }

  getEmployeDetails() {
    this.common.getEmployeeDetails().subscribe({
      next: (res) => {
        this.data = res;
        this.data.forEach((items: any) => {
          if (items.id === Number(this.employeeId.id)) {
            this.employeeData = items;
            // console.log(this.employeeData)
            this.userReg.patchValue(items)
            this.fetchJsonData();
          }
        })
      },
      error: console.log,

    })
  }
  


  fetchJsonData() {

    console.log(this.employeeData)
    this.empService.getCountryData().subscribe((data) => {
      this.countries = data;
    })

    this.empService.getStateData().subscribe((data) => {
      this.stateList = data;
      // console.log(this.stateList)
      if (this.employeeData.selectedCountry) {
        this.filteredStates = [];
        this.stateList.forEach((items: any) => {
          if (items.countryname === this.employeeData.selectedCountry) {
            this.filteredStates = [...this.filteredStates, items]
          }
        }
        );
        console.log(this.filteredStates)
      }
    })

    this.empService.getCityData().subscribe((data) => {
      this.citiList = data;
      // console.log(this.citiList);
      

      if (this.employeeData.selectedState) {
        this.filteredCities = [];
        this.citiList.forEach((items: any) => {
          if (items.statename === this.employeeData.selectedState) {
            this.filteredCities = [...this.filteredCities, items]
          }
        })
      }
    })

    const report = this.data;

    this.valueGet = this.employeeData.selectedCountry
    if (this.stateList) {
      this.filteredStates = this.stateList.filter((state: { countryname: any; }) => state.countryname === this.employeeData.selectedCountry);
      console.log(this.filteredStates)
    }

    this.onCountryChange;
    this.onStateChange;
    this.userReg.patchValue(this.data);

  }
  onCountryChange() {
    const selectedCountry = this.getSelectedCountry();
    const countryData = this.getCountryData(selectedCountry);
    this.filteredStates = this.getFilteredStates(countryData);
    this.updateStateAndCity(countryData);
    this.resetFormControls();
  }

  getSelectedCountry(): string {
    return this.userReg.value.selectedCountry;
  }

  // getCountryValue(event: any): string {
  //   return event.value;
  // }

  getCountryData(selectedCountry: string): any {
    return this.countries.find((country: { countryname: any; }) => country.countryname === selectedCountry);
  }

  getFilteredStates(countryData: any): any[] {
    if (countryData) {
      const selectedCountryname = countryData.countryname;
      return this.stateList.filter((state: { countryname: any; }) => state.countryname === selectedCountryname);
    } else {
      return [];
    }
  }

  updateStateAndCity(countryData: any) {
    if (countryData) {
      this.state = countryData.states;
      this.userReg.controls['selectedCity'].reset();
      this.city = [];
    } else {
      this.state = [];
    }
  }

  resetFormControls(): void {
    this.userReg.patchValue({ selectedState: '' });
    this.city = [];
    this.filteredCities = [];
    this.city = [];
  }

  onStateChange(event: any) {

    const selectedState = this.userReg.value.selectedState;
    const stateData = this.stateList.find((state: { statename: any; }) => state.statename === selectedState);
    if (stateData) {
      const selectedStatename = stateData.statename;
      this.filteredCities = this.citiList.filter((city: any) => city.statename === selectedStatename);
    } else {
      this.filteredCities = [];
    }

    // Reset city dropdown and city array
    this.userReg.patchValue({ selectedCity: '' });
    this.city = [];


  }

  onSubmit() {

    if (this.userReg.valid) {
      const formData = this.userReg.value;
      console.log(formData)
      if (this.data) {
        this.common.getUpdateEmployee(this.employeeId, this.userReg.valid).subscribe({
          next: (val: any) => {
            alert("Employee Detail Updated");
          },
          error: console.log,
        })
      } else {
        this.httpClient.post('https://retoolapi.dev/lcqe0N/empData', formData)
          .subscribe(data => {
            alert("Register Successfully")
            this.router.navigate(['/empData']);

          }, error => {
          });
      }
    } else {
      alert("Need to Fill All Fields...");
    }
    this.onReset();
  }

  onReset() {
    location.reload();
  }





}


