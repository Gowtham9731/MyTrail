import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmpDialogComponent } from '../emp-dialog/emp-dialog.component';
import { FormBuilder } from '@angular/forms';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonService } from 'src/app/Services/common.service';
import { publishFacade } from '@angular/compiler';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss']
})
export class EmpDetailsComponent implements OnInit {



  dialogVisible: boolean = false;

  displayedColumns: string[] = ['id', 'empname', 'date', 'mobnum', 'Gender', 'address', 'selectedCountry', 'selectedState', 'selectedCity', 'action', 'delete'];

  public empDetails: any = [];
  emp: any;

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogRef: any;
  selectedData: any;
  router: any;

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
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


  

  
  onDialog() {
    const dialogRef = this.matDialog.open(UserRegisterComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeDetails();
        }
      }
    })
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

    // console.log(data);

    // const selectedCountry = this.common.getCountryValue(event);
    // console.log(selectedCountry);
    this.common.getStatesByCountry(data.selectedCountry)

    // const selectedCountry = this.dataSource;
    // console.log(selectedCountry);

    // this.common.getCountryList(selectedCountry).subscribe((res:any)=>{
    //   console.log(res)

    // })
    // const selectedCountry = this.common.getCountryValue(event);
    // console.log(selectedCountry);

    

    const dialogRef=this.matDialog.open(UserRegisterComponent, {
      data,
      
    });
    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if (val) {
          this.getEmployeDetails();
        }
      }
    })
    
  }


}