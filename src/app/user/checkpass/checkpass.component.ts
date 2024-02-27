import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmpDialogComponent } from '../emp-dialog/emp-dialog.component';
import{MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-checkpass',
  templateUrl: './checkpass.component.html',
  styleUrls: ['./checkpass.component.scss']
})
export class CheckpassComponent {

  constructor(private matDialog:MatDialog){}

  onDialog(){
    this.matDialog.open(EmpDialogComponent,{
      width:'400px'
      
    })
  }





}
