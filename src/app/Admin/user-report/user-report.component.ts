import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { EmployeeService } from 'src/app/Services/empService';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent {



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

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    public routing: Router,
    private matDialog: MatDialog,
    private common: CommonService,

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
  }

  getEmployeDetails() {
    this.common.getEmployeeDetails().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        // console.log(this.dataSource);

        this.dataCopy = res;
        console.log(this.dataCopy)

      },
      error: console.log,

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  countryFilter(event:any,gender: string) {
    this.countryValue = (event.target as HTMLInputElement).value.toLowerCase(); // Convert filter value to lowercase
    // console.log(this.countryValue)

    // const genderData = this.dataCopy.filter((item: { Gender: string; }) => item.Gender.toLowerCase() === this.genderValue);
    // console.log(genderData)

    this.filteredCountryData = this.genderData.filter((item:any) =>item.selectedCountry.toLowerCase() === this.countryValue);
    // console.log(filteredCountryData)
    this.dataSource = this.filteredCountryData;
}


  genderFilter(event: Event) {
     this.genderValue = (event.target as HTMLInputElement).value.toLowerCase(); // Convert filter value to lowercase
    this.genderData = this.dataCopy.filter((item: { Gender: string; }) => item.Gender.toLowerCase() === this.genderValue);
    // Assuming filteredData is the result you want to set back to dataSource
    this.dataSource = this.genderData;
  }

  getCountryValue(event: any): string {
    return event.value;
  }

  stateFilter(event: Event) {
    const stateValue = (event.target as HTMLInputElement).value;
    const filteredData = this.filteredCountryData.filter((item: { selectedState: string; }) => item.selectedState.toLowerCase() === stateValue);
    this.dataSource = filteredData;

  }

  toClear() {

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

    this.routing.navigateByUrl(`userEntry-edit/${data.id}`).then(() => {
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
