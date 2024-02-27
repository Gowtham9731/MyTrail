import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/Services/common.service';
import { EmployeeRegisterComponent } from 'src/app/employee-register/employee-register.component';
import { EmpRegisterComponent } from '../emp-register/emp-register.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-emp-data',
  templateUrl: './emp-data.component.html',
  styleUrls: ['./emp-data.component.scss']
})
export class EmpDataComponent {

  displayedColumns: string[] = ['id', 'empname', 'date', 'mobnum', 'Gender', 'address', 'selectedCountry', 'selectedState', 'selectedCity', 'action', 'delete'];

  public empDetails: any = [];
  emp: any;

  dataSource!: MatTableDataSource<any>;
  router: any;

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    public routing: Router,
    private matDialog: MatDialog,
    private common: CommonService,
  ) {


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  

  ngOnInit() {

    this.getEmployeDetails();
  }

  getEmployeDetails() {
    this.common.getEmployeeDetails().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        // console.log(this.dataSource);
       
      },
      error: console.log,

    })
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

    // this.routing.navigateByUrl(`empRegister-edit/${data.id}`)
    // const dialogRef=this.matDialog.open(EmpRegisterComponent, {
    //   data,
      
    // });
    // dialogRef.afterClosed().subscribe({
    //   next: (val:any) => {
    //     if (val) {
    //       this.getEmployeDetails();
    //     }
    //   }
    // })

    this.routing.navigateByUrl(`empRegister-edit/${data.id}`).then(() => {
      // Navigation is successful
      this.getEmployeDetails();
    }).catch(error => {
      // Handle navigation error if needed
      console.error('Navigation error:', error);
    });

    
  }



}
