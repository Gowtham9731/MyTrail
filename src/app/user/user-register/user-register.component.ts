import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {


  userReg: FormGroup;
  countries: any;
  stateList: any;
  citiList: any;
  selectedCountry: any;
  name: string = '';
  // state: any;
  filteredStates: any;
  filteredCities: any;
  city: any;
  state: any;

  // hideRegisterForm: boolean = true;
  // hideEmployeeDetails: boolean = false;
  dialogVisible: boolean = false;

  displayedColumns: string[] = ['id', 'empname', 'date', 'mobnum', 'Gender', 'address', 'selectedCountry', 'selectedState', 'selectedCity', 'action', 'delete'];



  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private router: Router,
    private common: CommonService,
    private dialogRef: MatDialogRef<UserRegisterComponent>,
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


    this.fetchCountryData();
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

  fetchCountryData() {

    this.httpClient.get('https://retoolapi.dev/LrORIQ/country').subscribe((data: any) => {
      const responseData = data[0];
      this.countries = responseData.countries;
      console.log(this.countries)
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

  // onCountryChange(event: any) {

  //   const selectedCountry = this.userReg.value.selectedCountry;

  //   const countryData = this.countries.find((country: { name: any; }) => country.name === selectedCountry);

  //   const selectedCountryId = countryData.countryid;

  //   this.filteredStates = this.stateList.filter((state: { countryid: any; }) => state.countryid === selectedCountryId);

  //   this.state = countryData ? countryData.states : [];

  //   console.log(this.filteredStates)
  //   this.userReg.patchValue({ selectedState: '' });
  //   this.city = [];
  //   if (countryData) {
  //     this.state = countryData.states;
  //     this.userReg.controls['selectedCity'].reset();
  //     this.city = [];
  //   } else {
  //     this.state = [];
  //   }
  //   this.filteredCities = [];
  //   this.city = [];
  // }


  onCountryChange() {
    // const selectedCountry = this.getSelectedCountry(event);
    // console.log(selectedCountry)

    const selectedCountry = this.userReg.value.selectedCountry;

    //const selectedCountry = this.common.getCountryValue(event);
    console.log(selectedCountry);

    if(this.getCountryData(selectedCountry) == ""){
      setTimeout(()=>{
        const countryData = this.getCountryData(selectedCountry);
    // console.log(countryData)


    this.filteredStates = this.getFilteredStates(countryData);
    // console.log(this.filteredStates)

    this.updateStateAndCity(countryData);
    this.resetFormControls();
      },1000);
    }
    
    
  }
  public getSelectedCountry(event: any): string {
    return this.userReg.value.selectedCountry;
  }
  
  public getCountryData(selectedCountry: string): any {
    if(this.countries && this.countries.length > 0){
      return this.countries.find((country: { name: any; }) => country.name === selectedCountry);
    }else{
      return "";
      
    }
  }

  private getFilteredStates(countryData: any): any[] {
    if (countryData) {
      const selectedCountryId = countryData.countryid;
      return this.stateList.filter((state: { countryid: any; }) => state.countryid === selectedCountryId);
    } else {
      return [];
    }
  }

  public updateStateAndCity(countryData: any): void {
    if (countryData) {
      this.state = countryData.states;
      this.userReg.controls['selectedCity'].reset();
      this.city = [];
    } else {
      this.state = [];
    }
  }

  public resetFormControls(): void {
    this.userReg.patchValue({ selectedState: '' });
    this.city = [];
    this.filteredCities = [];
    this.city = [];
  }




  onStateChange(event: any) {

    const selectedCountry = this.userReg.value.selectedCountry;

    const selectedState = this.userReg.value.selectedState;

    // const selectedState = event.target.value;
    // console.log(selectedState)


    // Find the selected state data
    const stateData = this.stateList.find((state: { name: any; }) => state.name === selectedState);

    // Find the selected country data
    const countryData = this.countries.find((country: { name: any; }) => country.name === selectedCountry);

    // If country data is found
    if (countryData) {
      const selectedCountryId = countryData.countryid;

      // Filter states based on the selected country
      this.filteredStates = this.stateList.filter((state: { countryid: any; }) => state.countryid === selectedCountryId);

      // If state data is found
      if (stateData) {
        const selectedStateId = stateData.stateid;

        // Filter cities by both state ID and country ID
        this.filteredCities = this.citiList.filter((city: any) => city.stateid === selectedStateId && city.countryid === selectedCountryId);

        // Reset city dropdown
        this.userReg.patchValue({ selectedCity: '' });
        this.city = [];
      } else {
        // Reset city dropdown if no state data is found
        this.filteredCities = [];
        this.userReg.patchValue({ selectedCity: '' });
        this.city = [];
      }
    } else {
      // Reset state and city dropdowns if no country data is found
      this.filteredStates = [];
      this.filteredCities = [];
      this.userReg.patchValue({ selectedState: '', selectedCity: '' });
      this.city = [];
    }

  }

  onSubmit() {

    if (this.userReg.valid) {
      const formData = this.userReg.value;
      console.log(formData)
      if (this.data) {
        this.common.getUpdateEmployee(this.data.id, this.userReg.valid).subscribe({
          next: (val: any) => {
            alert("Employee Detail Updated");
            this.dialogRef.close(true);
          },
          error: console.log,
        })
      } else {
        this.httpClient.post('https://retoolapi.dev/lcqe0N/empData', formData)
          .subscribe(data => {
            alert("Register Successfully")
            this.router.navigate(['/empDetails']);
            this.dialogRef.close(true);

          }, error => {
          });
      }
    } else {
      alert("Need to Fill All Fields...");
    }
    // this.onReset();
  }

  onReset() {
    // this.userReg.reset();
    location.reload();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.empDetails.filter = filterValue.trim().toLowerCase();

  //   if (this.empDetails.paginator) {
  //     this.empDetails.paginator.firstPage();
  //   }
  // }

  // // onReset(form: NgForm): void {
  // //   form.reset();
  // // }


  // addEmployee() {
  //   this.hideRegisterForm = true;
  //   this.hideEmployeeDetails = false;
  // }

  ngOnInit() {
    this.fetchCountryData();
    this.userReg.patchValue(this.data);
    this.onCountryChange();
    this.userReg.get('selectedState')?.setValue(this.data.selectedState);

  }

  // onDialog(){
  //   this.hideRegisterForm = true;
  //   this.dialogVisible = true;
  //   this.matDialog.open(UserRegisterComponent, {
  //     width: 'fit-content',
  //     height: 'fit-content'

  //   });
  //   this.httpClient.get('https://retoolapi.dev/lcqe0N/empData').subscribe((data: any) => {
  //     const responsedata = data;
  //     console.log(responsedata);

  //   })
  // }

  // filterProduct(value: string){
  //   this.empDetails.filter = value.trim().toLowerCase();
  //   //  this.serviceAPI.getDataByFilter(value).subscribe(response =>
  //   //  {
  //   //    this.empDetails= response['products'];

  //   //  });
  // }

  // deleteEmployee(id: number) {

  //   const index = this.empDetails.find((empDe: any) => empDe.id === id);
  //   console.log(index);

  //   if (index !== -1) {
  //     this.empDetails.splice(index, 1);
  //   }

  //   // if (this.empDetails.length > 0) {
  //   // Find the index of the employee with the given id
  //   // this.empDetails.forEach((empDe: any, index:number) => {
  //   //   if(empDe.id === id){
  //   //     this.empDetails.splice(index, 1)
  //   //   }
  //   // });
  //   // console.log(this.empDetails)

  // }

  // editEmployee(id: number) {
  //   // Implement the functionality to navigate to the edit page or display a modal for editing
  //   console.log('Edit employee with ID:', id);
  //   // Example: You can navigate to the edit page passing the employee ID as a route parameter
  //   // this.router.navigate(['/edit', id]);
  // }

}
