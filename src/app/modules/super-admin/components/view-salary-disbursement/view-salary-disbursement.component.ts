import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperAdminService } from '../../service/super-admin.service';
import { ViewPaymentComponent } from '../view-payment/view-payment.component';

@Component({
  selector: 'app-view-salary-disbursement',
  templateUrl: './view-salary-disbursement.component.html',
  styleUrl: './view-salary-disbursement.component.css'
})
export class ViewSalaryDisbursementComponent {
  constructor(
    private superAdminService:SuperAdminService,
    public dialogRef: MatDialogRef<ViewPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public salaryDisbursement: any
  ) {}

  approve() {
    console.log('Salary Approved:', this.salaryDisbursement);
    this.superAdminService.salaryDisbursementStatus(this.salaryDisbursement.id, "Success").subscribe((response)=>{
      console.log(response);  
    },
    (err)=>{
      console.log("Cannot Update ", err)
    }
  )
    this.dialogRef.close('approved');
  }

  reject() {
    console.log('Salary Rejected:', this.salaryDisbursement);
    this.superAdminService.salaryDisbursementStatus(this.salaryDisbursement.id, "Reject").subscribe(
      (response)=>{
        console.log(response);  
      },
      (err)=>{
        console.log("Cannot Update ", err)
      }
    )
    this.dialogRef.close('rejected');
  }

}
