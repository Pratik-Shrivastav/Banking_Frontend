import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BankService } from '../../service/bank.service';
import { ViewsuccesspaymentComponent } from '../viewsuccesspayment/viewsuccesspayment.component';
import { ViewpendingpaymentComponent } from '../viewpendingpayment/viewpendingpayment.component';
import { ViewSuccessSalaryComponent } from '../view-success-salary/view-success-salary.component';
import { ViewPendingSalaryComponent } from '../view-pending-salary/view-pending-salary.component';
import moment from 'moment';

@Component({
  selector: 'app-view-client-sucess',
  templateUrl: './view-client-sucess.component.html',
  styleUrls: ['./view-client-sucess.component.css']
})
export class ViewClientSucessComponent {
  client: any; // Holds the client data
  salaryDisbursementList: any;
  loading: boolean = true; // Loading indicator
  error: string | null = null; // Error message
  filterOption: string = 'all'; // Default filter option
  filteredPayments: any[] = [];
  filteredSalaryDisbursements: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private bankService: BankService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    if (clientId) {
      this.loadClientDetails(parseInt(clientId));
      this.loadSalaryDisbursementClient(parseInt(clientId));
    }
  }

  loadClientDetails(id: number): void {
    this.bankService.getClientById(id).subscribe({
      next: (client) => {
        this.client = client;
        this.filteredPayments = this.client?.beneficiaryList.flatMap((b: any) => b.paymentsList) || [];
        this.applyFilter(); // Apply filter on load
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching client details:', err);
        this.error = 'Failed to load client details';
        this.loading = false;
      }
    });
  }

  loadSalaryDisbursementClient(id: number): void {
    this.bankService.getClientSalaryDisbursementById(id).subscribe({
      next: (salaryDisbursement) => {
        this.salaryDisbursementList = salaryDisbursement;
        this.filteredSalaryDisbursements = this.salaryDisbursementList || [];
        this.applyFilter(); // Apply filter on load
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Disbursement details:', err);
        this.error = 'Failed to load Disbursement details';
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const now = moment();

    // Filter Payments
    this.filteredPayments = this.client?.beneficiaryList.flatMap((b: any) => b.paymentsList) || [];
    if (this.filterOption === '24h') {
      this.filteredPayments = this.filteredPayments.filter(payment =>
        moment(payment.createdAt).isAfter(now.subtract(24, 'hours')));
    } else if (this.filterOption === '30d') {
      this.filteredPayments = this.filteredPayments.filter(payment =>
        moment(payment.createdAt).isAfter(now.subtract(30, 'days')));
    }

    // Sort Payments
    this.filteredPayments.sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));

    // Filter Salary Disbursements
    this.filteredSalaryDisbursements = this.salaryDisbursementList || [];
    if (this.filterOption === '24h') {
      this.filteredSalaryDisbursements = this.filteredSalaryDisbursements.filter(salary =>
        moment(salary.processedAt).isAfter(now.subtract(24, 'hours')));
    } else if (this.filterOption === '30d') {
      this.filteredSalaryDisbursements = this.filteredSalaryDisbursements.filter(salary =>
        moment(salary.processedAt).isAfter(now.subtract(30, 'days')));
    }

    // Sort Salary Disbursements
    this.filteredSalaryDisbursements.sort((a, b) => moment(b.processedAt).diff(moment(a.processedAt)));
  }

  onFilterChange(option: string): void {
    this.filterOption = option;
    this.applyFilter();
  }

  viewPaymentDetails(benificiary: any, payment: any) {
    const dialogRef = this.dialog.open(ViewpendingpaymentComponent, {
      width: '400px',
      data: { benificiary, payment }
    });
  }

  viewCompletedPayment(payment: any) {
    const dialogRef = this.dialog.open(ViewsuccesspaymentComponent, {
      width: '400px',
      data: payment
    });
  }

  viewCompletedSalaryDisbursement(salaryDisbursement: any) {
    const dialogRef = this.dialog.open(ViewSuccessSalaryComponent, {
      width: '400px',
      data: salaryDisbursement
    });
  }

  viewSalaryDisbursementDetails(salaryDisbursement: any) {
    const clientId = this.client.id;
    const dialogRef = this.dialog.open(ViewPendingSalaryComponent, {
      width: '400px',
      data: { salaryDisbursement, clientId }
    });
  }
}
