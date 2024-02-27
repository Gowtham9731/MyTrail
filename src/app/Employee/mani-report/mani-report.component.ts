import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, TitleStrategy } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { EmployeeService } from 'src/app/Services/empService';

@Component({
  selector: 'app-mani-report',
  templateUrl: './mani-report.component.html',
  styleUrls: ['./mani-report.component.scss']
})
export class ManiReportComponent {




  displayedColumns: string[] = ['id', 'empname', 'date', 'mobnum', 'Gender', 'address', 'selectedCountry', 'selectedState', 'selectedCity', 'action', 'delete'];

  public empDetails: any = [];
  emp: any;

  dataSource!: MatTableDataSource<any>;
  router: any;
  // gender: any;

  reportForm: FormGroup;
  dataCopy: any;

  searchName: string = '';
  countryName: string = '';
  stateName: string = '';
  genderName: string = '';
  selectedCountry: any;

  gender: string = '';
  genderValue: any;
  countryValue: any;
  genderData: any;
  filteredCountryData: any;
  searchState: any;
  selectedGender: any;
  paithiyam: any;
  allgender: any;
  mudiyala: any;
  allGenderArray: any;
  AllGenderValues: any;
  uniqueGendersSet: any;
  countries: any;
  stateList: any;
  citiList: any;
  filteredStateData: any;
  stateValue: any;
  countryDa: any;
  filteredStates: any;
  state: any;

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    public routing: Router,
    private matDialog: MatDialog,
    private common: CommonService,
    private empService: EmployeeService,

  ) {

    this.reportForm = this.fb.group({
      genderName: [''],
      countryName: [''],
      stateName: [''],
      searchName: [''],

    })

  }

  ngOnInit() {

    this.getEmployeDetails();

    this.JsonData();

    // this.getAllCountryValues();
  }

  getEmployeDetails() {
    this.common.getEmployeeDetails().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        // console.log(this.dataSource);

        this.dataCopy = res;
        // console.log(this.dataCopy)

      },
      error: console.log,

    })
  }

  JsonData() {
    this.empService.getCountryData().subscribe((data) => {
      this.countries = data;
    })
    this.empService.getStateData().subscribe((data) => {
      this.stateList = data;
    })
    this.empService.getCityData().subscribe((data) => {
      this.citiList = data;
    })
  }


  // getAllCountryValues() {
  //   const allSelectedCountries = this.dataCopy.map((item: { selectedCountry: any; }) => item.selectedCountry);
  //   console.log(allSelectedCountries);
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchName = this.dataCopy.filter((item: any) => item.fullname.toLowerCase() === filterValue);
    this.dataSource.filter = this.searchName.trim().toLowerCase();
  }


  onCountryFilter() {
    this.countryValue = this.reportForm.value.countryName;
    // console.log(this.countryValue)

    this.filteredStates = this.stateList.filter((state: { countryname: any; }) => state.countryname === this.countryValue);
    console.log(this.filteredStates)
    
    this.countryDa = this.countries.find((country: { countryname: any; }) => country.countryname === this.countryValue);
    console.log(this.countryDa)

      // this.state = this.countryDa ? this.countryDa.states : [];

    if (this.genderData) {
      this.filteredCountryData = this.genderData.filter((item: any) => item.selectedCountry === this.countryValue);
      console.log(this.filteredCountryData)
      this.dataSource = this.filteredCountryData;

    } else {
      alert('select the Gender');
      this.filteredCountryData = [];
      this.reportForm.patchValue({ countryName: '' });
    }


  }


  genderFilter() {

    const selectedGender = this.reportForm.value.genderName;
    console.log(selectedGender);

    this.genderData = this.dataCopy.filter((item: { Gender: string; }) => item.Gender.toLowerCase() === selectedGender);
    // Assuming filteredData is the result you want to set back to dataSource
    this.dataSource = this.genderData;
  }

  stateFilter() {

    const stateValue = this.reportForm.value.stateName;
      console.log(stateValue)

      this.stateValue = this.reportForm.value.stateName;

    if (this.filteredCountryData) {
      this.filteredStateData = this.filteredCountryData.filter((item: any) => item.selectedState === this.stateValue);
      console.log(this.filteredStateData)

      this.dataSource = this.filteredStateData;

    } else {
      alert('select the Country');
      this.filteredStateData = [];
      this.reportForm.patchValue({ stateName: '' });
    }

    // const selectedCountryname = this.filteredCountryData.countryname;
    
    // this.filteredStates = this.stateList.filter((state: { countryname: any; }) => state.countryname === selectedCountryname);
    // console.log(this.filteredStates)

    // const countryData = this.countries.find((country: { countryname: any; }) => country.countryname === selectedCountryname);
    // console.log(countryData)

    //   this.state = countryData ? countryData.states : [];
  
    //   // console.log(this.filteredStates)
    //   this.reportForm.patchValue({ selectedState: '' });
  


  }

  // stateFilter() {
  //   // if (this.filteredCountryData) {
  //   //   const selectedState = this.reportForm.value.stateName;
  //   //   const chumma = this.filteredCountryData.filter((item: any) => item.selectedState === selectedState);
  //   //   console.log(chumma)
  //   //   this.dataSource = chumma;
  //   // }

  //   const selectedState = this.reportForm.value.stateName;
  //   console.log(selectedState)

  //   // const countryDa = this.countries.find((country: { country: any; }) => country.countryname === this.countryValue);
  //   // console.log(countryDa)

  // //  this.countryDa = this.stateList.find((state: { countryname: any; }) => state.countryname === this.countryValue);
  // //   console.log(this.countryDa)

  //   if (this.filteredCountryData) {
  //     const selectedCountryname = this.filteredCountryData.countryname;
  //     const countryDa=this.stateList.filter((state: { countryname: any; }) => state.countryname === selectedCountryname);
  //     console.log(countryDa);
  //   } else {
  //     // countryDa= [];
  //   } 
  //   // if (this.filteredCountryData) {
  //   //   const selectedStatename = stateData.statename;
  //   //   console.log(selectedStatename)
  //   //   // this.filteredCities = this.citiList.filter((city: any) => city.statename === selectedStatename);
  //   // } else {
  //   //   // this.filteredState = [];
  //   // }

  //   // Reset city dropdown and city array
  //   this.reportForm.patchValue({ stateName: '' });

  //   // try SEcont Method:
  //   // this.stateValue = this.reportForm.value.stateName;

  //   // if (this.filteredCountryData) {
  //   //   this.filteredStateData = this.filteredCountryData.filter((item: any) => item.selectedState === this.stateValue);
  //   //   console.log(this.filteredStateData)

  //   //   this.dataSource = this.filteredStateData;

  //   // } else {
  //   //   alert('select the Country');
  //   //   this.filteredStateData = [];
  //   //   this.reportForm.patchValue({ stateName: '' });
  //   // // this.cityName = [];
  //   // }


  //   // const selectedState = this.reportForm.value.selectedState;

  //   // const stateData = this.stateList.find((state: { statename: any; }) => state.statename === selectedState);
  //   // if (stateData) {
  //   //   const selectedStatename = stateData.statename;
  //   // } else {
  //   //   this.filteredCountryData = [];
  //   // }

  //   // const stateValue = (event.target as HTMLInputElement).value;


  //   // const stateValue = this.reportForm.value.stateName;
  //   // console.log(stateValue)

  //   // const countryData=this.countries.find((country: { countryname: any; }) => country.countryname === this.countryValue);
  //   // console.log(countryData)

  //   // if (this.filteredCountryData) {
  //   //   const selectedCountryname = countryData.countryname;
  //   //   return this.stateList.filter((state: { countryname: any; }) => state.countryname === selectedCountryname);
  //   // } else {
  //   //   return [];
  //   // }

  //   // const filteredState=this.stateList.filter((state: { countryname: any; }) => state.countryname === this.countryValue);
  //   // console.log(filteredState);


  //   // const filteredData = this.filteredCountryData.filter((item: { selectedState: string; }) => item.selectedState === stateValue);
  //   // this.dataSource = filteredData;
  //   // } else {
  //   //   alert('select the Country');
  //   // }





  // }

  toClear() {

    // const selectedCountries = this.dataCopy.reduce((acc: any[], curr: { selectedCountry: any; }) => {
    //   acc.push(curr.selectedCountry);
    //   return acc;
    // }, []);

    // console.log(selectedCountries);

    // const selectedStates = this.dataCopy.reduce((acc: any[], curr: { selectedState: any; }) => {
    //   acc.push(curr.selectedState);
    //   return acc;
    // }, []);

    // console.log(selectedStates);

    // const selectedGender = this.dataCopy.reduce((acc: any[], curr: { Gender: any; }) => {
    //   acc.push(curr.Gender);
    //   return acc;
    // }, []);

    // console.log(selectedGender);

    // const paithiyam = this.dataCopy.flatMap((item:any) => item.selectedCountry);
    // console.log(paithiyam);

    this.reportForm.reset();
    this.getEmployeDetails();

  }


  deleteEmployee(id: number) {
    this.common.deleteUser(id).subscribe({
      next: (res) => {
        alert('successFull Deleted')
        this.getEmployeDetails();
      },
      error: console.log,

    })
  }

  editEmployee(data: any) {

    this.routing.navigateByUrl(`mEntry-edit/${data.id}`).then(() => {
      // Navigation is successful
      this.getEmployeDetails();
    }).catch(error => {
      // Handle navigation error if needed
      console.error('Navigation error:', error);
    });


  }

  addEmployee() {
    this.router.navigateByUrl('/userEntry');
  }
}

