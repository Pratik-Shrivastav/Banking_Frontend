import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuperAdminService } from '../../service/super-admin.service';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrl: './view-payment.component.css'
})
export class ViewPaymentComponent {
  constructor(
    private superAdminService:SuperAdminService,
    public dialogRef: MatDialogRef<ViewPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get benificiary() {
    return this.data.benificiary;
  }

  get payment() {
    return this.data.payment;
  }

  get clientId(){
    return this.data.clientId;
  }

  approve() {
    console.log('Payment Approved:', this.data);
    this.superAdminService.paymentStatus(this.payment.id,"Success",this.clientId).subscribe(
      (response)=>{
        console.log(response);  
      },
      (err)=>{
        console.log("Cannot Update ", err)
      }
    )
    this.dialogRef.close('approved');
  }

  reject() {
    console.log('Payment Rejected:', this.data);
    this.superAdminService.paymentStatus(this.payment.id,"Reject",this.clientId).subscribe(
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
