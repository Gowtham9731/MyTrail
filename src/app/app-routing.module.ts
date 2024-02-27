import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { CheckpassComponent } from './user/checkpass/checkpass.component';
import { NewpasswordComponent } from './user/newpassword/newpassword.component';
import { EmpDetailsComponent } from './user/emp-details/emp-details.component';
import { EmpDialogComponent } from './user/emp-dialog/emp-dialog.component';
import { DummyComponent } from './dummy/dummy.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { TrailComponent } from './trail/trail.component';
import { EmpRegisterComponent } from './Employee/emp-register/emp-register.component';
import { EmpDataComponent } from './Employee/emp-data/emp-data.component';
import { UserEntryComponent } from './Admin/user-entry/user-entry.component';
import { UserReportComponent } from './Admin/user-report/user-report.component';
import { ManiEntryComponent } from './Employee/mani-entry/mani-entry.component';
import { ManiReportComponent } from './Employee/mani-report/mani-report.component';

const routes: Routes = [
  {path:'empreg',component:EmployeeRegisterComponent},
  {path:'reg',component:RegisterComponent},
  {path:'forgot',component:ForgotpasswordComponent},
  {path:'check',component:CheckpassComponent},
  {path:'newpass',component:NewpasswordComponent},
  {path:'reg',component:RegisterComponent},
  {path:'empDetails',component:EmpDetailsComponent},
  {path:'empDialog',component:EmpDialogComponent},
  {path:'dummy',component:DummyComponent},
  {path:'userReg',component:UserRegisterComponent},
  {path:'trail',component:TrailComponent},
  {path:'empRegister',component:EmpRegisterComponent},
  {path:'empRegister-edit/:id',component:EmpRegisterComponent},
  {path:'empData',component:EmpDataComponent},
  {path:'userEntry',component:UserEntryComponent},
  {path:'userReport',component:UserReportComponent},
  {path:'userEntry-edit/:id',component:UserEntryComponent},
  {path:'mEntry',component:ManiEntryComponent},
  {path:'mReport',component:ManiReportComponent},
  {path:'mEntry-edit/:id',component:ManiEntryComponent},



  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
