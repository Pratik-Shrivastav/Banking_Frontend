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
  paymentFilter: string = 'All';
  salaryFilter: string = 'All';

  totalSalary!:number;
  currentPageSalary:number = 1;
  pageSize:number = 5;

  beneficiaryList!:any;
  totalBeneficiary!:number
  beneficiaryCurrentPage:number=1;
  selectedBeneficiary!:any

  paymentList!:any
  totalPayments!:number
  paymentCurrentPage:number=1;

  onPageChangeSalary($event:any){
    this.currentPageSalary = $event.pageIndex + 1;
    this.loadSalaryDisburseemntCLient(this.client.id);
  }
  onPageChangeBeneficiary($event:any){
    this.beneficiaryCurrentPage = $event.pageIndex +1;
    this.loadBeneficiarysOfClient(this.client.id)
  }

  onPageChangePayment($event:any){
    this.paymentCurrentPage = $event.pageIndex +1;
    this.loadPaymentsOfBeneficiary(this.selectedBeneficiary)
  }

  constructor(
    private route: ActivatedRoute,
    private superAdminService: SuperAdminService,
    private dialog: MatDialog,
  ) { }

  selectedTab: string = 'tab1'; // Default selected tab

  selectTab(tab: string): void {
    this.selectedTab = tab; // Update the selected tab
  }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    if (clientId) {
      this.loadClientDetails(parseInt(clientId));
      this.loadBeneficiarysOfClient(parseInt(clientId));
      this.loadSalaryDisburseemntCLient(parseInt(clientId))
    }
  }
  

  // Method to filter salary disbursements based on selected filter
  getFilteredPayments(beneficiary: any): any[] {
    if (this.paymentFilter === 'All') {
        return this.paymentList;
    }
    return this.paymentList.filter((payment: any) => payment.status === this.paymentFilter);
}

getFilteredSalaryDisbursements(): any[] {
    if (this.salaryFilter === 'All') {
        return this.salaryDisbursementList;
    }
    return this.salaryDisbursementList.filter((salary: any) => salary.status === this.salaryFilter);
}
  getStatusClass(status: string): string {
    switch (status) {
        case 'Success':
            return 'status-success';
        case 'Pending':
            return 'status-pending';
        case 'Reject':
            return 'status-rejected';
        default:
            return '';
    }
}

getStatusIcon(status: string): string {
    switch (status) {
        case 'Success':
            return 'fas fa-check-circle';
        case 'Pending':
            return 'fas fa-hourglass-half';
        case 'Reject':
            return 'fas fa-times-circle';
        default:
            return '';
    }
}

  loadClientDetails(id: number): void {
    this.superAdminService.getClientById(id).subscribe({
      next: (client) => {
        this.client = client;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching client details:', err);
        this.error = 'Failed to load client details';
        this.loading = false;
      }
    });
  }

  loadBeneficiarysOfClient(id:number){
    this.superAdminService.getpaginationBeneficiary(id, this.beneficiaryCurrentPage, this.pageSize).subscribe({
      next: (beneficiarys) => {
        this.beneficiaryList = beneficiarys.paginatedBenificiary;
        this.totalBeneficiary = beneficiarys.count;
        console.log(this.beneficiaryList);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Disbursement details:', err);
        this.error = 'Failed to load Disbursement details';
        this.loading = false;
      }
    });
  }

  loadPaymentsOfBeneficiary(beneficiary:any){
    this.selectedBeneficiary = beneficiary;
    console.log(beneficiary.benificiaryName);
    this.superAdminService.getpaginationPaymentsByBeneficiaryId(beneficiary.id, this.paymentCurrentPage, this.pageSize).subscribe({
      next: (payments) => {
        this.paymentList = payments.paginatedPayments;
        this.totalPayments = payments.count;
        console.log(this.paymentList);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Disbursement details:', err);
        this.error = 'Failed to load Disbursement details';
        this.loading = false;
      }
    });
    
  }

  loadSalaryDisburseemntCLient(id:number):void{    
    this.superAdminService.getClientSalaryDisbursementById(id, this.currentPageSalary, this.pageSize).subscribe({
      next: (salaryDisbursement) => {
        this.salaryDisbursementList = salaryDisbursement.paginatedSalary;
        this.totalSalary = salaryDisbursement.count;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Disbursement details:', err);
        this.error = 'Failed to load Disbursement details';
        this.loading = false;
      }
    });
  }

  viewPaymentDetails(payment:any) {
    const clientId = this.client.id;
    const benificiary = this.selectedBeneficiary
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
