import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-pending-salary',
  templateUrl: './view-pending-salary.component.html',
  styleUrl: './view-pending-salary.component.css'
})
export class ViewPendingSalaryComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewPendingSalaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get salaryDisbursement(){
    return this.data.salaryDisbursement
  }


}
