import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service';
import { ViewPaymentComponent } from '../view-payment/view-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewSuccessPaymentComponent } from '../view-success-payment/view-success-payment.component';
import { ViewSalaryDisbursementComponent } from '../view-salary-disbursement/view-salary-disbursement.component';
import { ViewSuccessSalaryDisbursementComponent } from '../view-success-salary-disbursement/view-success-salary-disbursement.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ToastService } from '../../../../service/toast.service';

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

  selectedTab: string = 'tab3'; 

  totalSalary!:number;
  currentPageSalary:number = 1;
  pageSize:number = 5;

  beneficiaryList!:any;
  beneficiaryListAll!:any;
  totalBeneficiary!:number;
  totalBeneficiaryAll!:number;
  beneficiaryCurrentPage:number=1;
  selectedBeneficiary!:any;

  
  paymentList!:any;
  paymentListAll!:any;
  totalPayments!:number;
  totalPaymentsAll!:number;
  paymentCurrentPage:number=1;


  searchFormBeneficiary!: FormGroup;
  searchBeneficiaryCurrentPage:number =1;
  getTypeBeneficiary:string="All Beneficiary";

  searchFormPayment!: FormGroup;
  searchPaymentCurrentPage:number = 1;
  getTypePayment:string="All Payment";

  constructor(
    private route: ActivatedRoute,
    private superAdminService: SuperAdminService,
    private dialog: MatDialog,
    private fb:FormBuilder,
    private toast:ToastService
  ) { 
    this.searchFormBeneficiary = this.fb.group({
      searchTerm: [''] 
    });
    this.searchFormPayment = this.fb.group({
      searchTermPayment: [''] 
    });
  }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    if (clientId) {
      this.loadClientDetails(parseInt(clientId));
      this.loadBeneficiarysOfClient(parseInt(clientId));
      this.loadSalaryDisburseemntCLient(parseInt(clientId))
    }
    this.searchFormBeneficiary.get('searchTerm')?.valueChanges
      .pipe(debounceTime(500)) 
      .subscribe(() => this.onSearchBeneficiary());
    this.searchFormPayment.get('searchTermPayment')?.valueChanges
      .pipe(debounceTime(500)) 
      .subscribe(() => this.onSearchPayment());
  }

  selectTab(tab: string): void {
    this.selectedTab = tab; // Update the selected tab
  }


  loadBeneficiarysOfClient(id:number){
    this.loading = true;
    this.superAdminService.getpaginationBeneficiary(id, this.beneficiaryCurrentPage, this.pageSize).subscribe({
      next: (beneficiarys) => {
        this.beneficiaryList = beneficiarys.paginatedBenificiary;
        this.beneficiaryListAll = [...this.beneficiaryList];
        this.totalBeneficiary = beneficiarys.count;
        this.totalBeneficiaryAll = this.totalBeneficiary;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Disbursement details:', err);
        this.error = 'Failed to load Disbursement details';
        this.loading = false;
      }
    });
  }

  onPageChangeBeneficiary($event:any){
    if(this.getTypeBeneficiary=="All Beneficiary"){
      this.beneficiaryCurrentPage = $event.pageIndex +1;
      this.loadBeneficiarysOfClient(this.client.id)
    }
    else{
      this.searchBeneficiaryCurrentPage = $event.pageIndex +1;
      this.onSearchBeneficiary();
    }
  }

  onSearchBeneficiary(): void {
    const searchTerm = this.searchFormBeneficiary.get('searchTerm')?.value.trim();
    if (searchTerm) {
      this.loading = true; // Show loading indicator during search
      this.getTypeBeneficiary = "Search Beneficiary";
      this.superAdminService.getBeneficiaryByName(this.client.id,searchTerm,this.searchBeneficiaryCurrentPage,this.pageSize ).subscribe((beneficiaryByName) => {
        this.beneficiaryList = beneficiaryByName.paginatedBeneficiarySearch;        
        this.totalBeneficiary = beneficiaryByName.count;
      });
    } else {
      this.getTypeBeneficiary = "All Beneficiary";
      this.beneficiaryList = [...this.beneficiaryListAll];
      this.totalBeneficiary = this.totalBeneficiaryAll;
    }
  }

  onPageChangeSalary($event:any){
    this.currentPageSalary = $event.pageIndex + 1;
    this.loadSalaryDisburseemntCLient(this.client.id);
  }

  loadPaymentsOfBeneficiary(beneficiary:any){
    this.selectedBeneficiary = beneficiary;
    console.log(beneficiary.benificiaryName);
    this.superAdminService.getpaginationPaymentsByBeneficiaryId(beneficiary.id, this.paymentCurrentPage, this.pageSize).subscribe({
      next: (payments) => {
        this.paymentList = payments.paginatedPayments;
        this.paymentListAll = this.paymentList;
        this.totalPayments = payments.count;
        this.totalPaymentsAll = this.totalPayments;
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


  onSearchPayment(){
    const searchTermPayment = this.searchFormPayment.get('searchTermPayment')?.value.trim();
    console.log(searchTermPayment);
    
    if (searchTermPayment) {
      this.loading = true; // Show loading indicator during search
      this.getTypePayment= "Search Paymnet";
      this.superAdminService.getPaymentByName(this.client.id,searchTermPayment,this.searchPaymentCurrentPage,this.pageSize ).subscribe((paymentsByname) => {
        console.log(paymentsByname);  
        this.paymentList = paymentsByname.paginatedPaymentSearch;        
        this.totalPayments = paymentsByname.count;
      });
    } else {
      this.getTypePayment = "All Payment";
      this.paymentList = [...this.paymentListAll];
      this.totalPayments = this.totalPaymentsAll;
    }

  }

  onPageChangePayment($event:any){
    this.paymentCurrentPage = $event.pageIndex +1;
    this.loadPaymentsOfBeneficiary(this.selectedBeneficiary)
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
        this.loadPaymentsOfBeneficiary(this.selectedBeneficiary);
        // Handle approval logic here
      } else if (result === 'rejected') {
        console.log('Payment was rejected');
        this.loadPaymentsOfBeneficiary(this.selectedBeneficiary);
      }
      else if(result==="RejectedByGateway"){
        console.log("Gateway Error");
        this.loadPaymentsOfBeneficiary(this.selectedBeneficiary);
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
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'approved') {
        console.log('Salary was approved');
        this.loadSalaryDisburseemntCLient(this.client.id);
        // Handle approval logic here
      } else if (result === 'rejected') {
        console.log('Salary was rejected');
        this.loadSalaryDisburseemntCLient(this.client.id);
      }
    });
  }
}
