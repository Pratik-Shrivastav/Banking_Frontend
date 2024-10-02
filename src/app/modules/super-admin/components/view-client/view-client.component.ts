import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service';
import { ViewPaymentComponent } from '../view-payment/view-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewSuccessPaymentComponent } from '../view-success-payment/view-success-payment.component';
import { ViewSalaryDisbursementComponent } from '../view-salary-disbursement/view-salary-disbursement.component';
import { ViewSuccessSalaryDisbursementComponent } from '../view-success-salary-disbursement/view-success-salary-disbursement.component';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  client: any; // Holds the client data
  salaryDisbursementList:any;
  loading: boolean = true; // Loading indicator
  error: string | null = null; // Error message


  constructor(
    private route: ActivatedRoute,
    private superAdminService: SuperAdminService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    if (clientId) {
      this.loadClientDetails(parseInt(clientId));
      this.loadSalaryDisburseemntCLient(parseInt(clientId))
    }
  }


  loadClientDetails(id: number): void {
    this.superAdminService.getClientById(id).subscribe({
      next: (client) => {
        this.client = client;
        console.log(client);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching client details:', err);
        this.error = 'Failed to load client details';
        this.loading = false;
      }
    });
  }

  loadSalaryDisburseemntCLient(id:number):void{
    this.superAdminService.getClientSalaryDisbursementById(id).subscribe({
      next: (salaryDisbursement) => {
        this.salaryDisbursementList = salaryDisbursement;
        console.log(salaryDisbursement);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Disbursement details:', err);
        this.error = 'Failed to load Disbursement details';
        this.loading = false;
      }
    });
  }

  viewPaymentDetails(benificiary: any, payment:any) {
    const clientId = this.client.id;
    const dialogRef = this.dialog.open(ViewPaymentComponent, {
      width: '400px',
      data: {benificiary, payment ,clientId}
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result === 'approved') {
        console.log('Payment was approved');
        this.ngOnInit();
        // Handle approval logic here
      } else if (result === 'rejected') {
        console.log('Payment was rejected');
        this.ngOnInit();

        // Handle rejection logic here
      }
    });
  };

  viewCompletedPayment(payment:any){
    const dialogRef = this.dialog.open(ViewSuccessPaymentComponent, {
      width: '400px',
      data: payment
    });
  }

  viewCompletedSalaryDisbursement(salaryDisbursement:any){
    const dialogRef = this.dialog.open(ViewSuccessSalaryDisbursementComponent, {
      width: '400px',
      data: salaryDisbursement
    });
  }
  viewSalaryDisbursementDetails(salaryDisbursement:any){
    const clientId = this.client.id;
    const dialogRef = this.dialog.open(ViewSalaryDisbursementComponent, {
      width: '400px',
      data: {salaryDisbursement,clientId }
    });
  }
}
