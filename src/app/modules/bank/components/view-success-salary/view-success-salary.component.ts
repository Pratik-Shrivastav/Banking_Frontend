import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-success-salary',
  templateUrl: './view-success-salary.component.html',
  styleUrl: './view-success-salary.component.css'
})
export class ViewSuccessSalaryComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewSuccessSalaryComponent>,
    @Inject(MAT_DIALOG_DATA) public salaryDisbursement: any
  ) {
    console.log(salaryDisbursement);
    
  }

}
