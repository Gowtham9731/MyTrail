import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule,} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './user/register/register.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { CheckpassComponent } from './user/checkpass/checkpass.component';
import { HttpClientModule } from '@angular/common/http';
import { NewpasswordComponent } from './user/newpassword/newpassword.component';
// import { MatSelectChange } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
// import { MatDialogRef } from '@angular/material/dialog';



// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import {KeyFilterModule} from 'primeng/keyfilter';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';








import { EmpDetailsComponent } from './user/emp-details/emp-details.component';
import { EmpDialogComponent } from './user/emp-dialog/emp-dialog.component';
import { DummyComponent } from './dummy/dummy.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { TrailComponent } from './trail/trail.component';
import { PuthusuComponent } from './New/puthusu/puthusu.component';
import { OldComponent } from './New/old/old.component';
import { EmpRegisterComponent } from './Employee/emp-register/emp-register.component';
import { EmpDataComponent } from './Employee/emp-data/emp-data.component';
import { UserEntryComponent } from './Admin/user-entry/user-entry.component';
import { UserReportComponent } from './Admin/user-report/user-report.component';
import { ManiEntryComponent } from './Employee/mani-entry/mani-entry.component';
import { ManiReportComponent } from './Employee/mani-report/mani-report.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeRegisterComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    CheckpassComponent,
    NewpasswordComponent,
    EmpDetailsComponent,
    EmpDialogComponent,
    DummyComponent,
    UserRegisterComponent,
    TrailComponent,
    PuthusuComponent,
    OldComponent,
    EmpRegisterComponent,
    EmpDataComponent,
    UserEntryComponent,
    UserReportComponent,
    ManiEntryComponent,
    ManiReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    BrowserAnimationsModule,FormsModule,
    NgbModule,MatInputModule,MatRadioModule,ReactiveFormsModule,MatButtonModule,
    MatSelectModule,MatDatepickerModule,MatIconModule,MatFormFieldModule,MatNativeDateModule,
    MatDialogModule,MatTableModule,MatPaginatorModule,MatCardModule,MatSortModule,
    // PrimeNG Modules...
    ButtonModule,ChipsModule,TooltipModule,CardModule,DataViewModule,CalendarModule,InputNumberModule,
    InputTextareaModule,RadioButtonModule,DropdownModule,KeyFilterModule,ToggleButtonModule,
    AutoCompleteModule,TableModule,DialogModule,DynamicDialogModule,BrowserAnimationsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
