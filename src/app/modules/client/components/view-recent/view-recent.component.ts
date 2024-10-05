import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from '../details-modal/details-modal.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './view-recent.component.html',
  styleUrls: ['./view-recent.component.css']
})
export class ViewRecentComponent implements OnInit {
  salaryDisbursements: any[] = [];
  recentPayments: any[] = [];
  filteredSalaryDisbursements: any[] = [];
  filteredRecentPayments: any[] = [];


  // Pagination state for salary disbursements
  salaryPageNumber: number = 1;
  salaryPageSize: number = 5;
  salaryTotalPages: number = 1;

  // Pagination state for recent payments
  paymentPageNumber: number = 1;
  paymentPageSize: number = 5;
  paymentTotalPages: number = 1;

  constructor(private clientService: ClientService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadPaginatedSalaryDisbursements(this.salaryPageNumber, this.salaryPageSize);
    this.loadPaginatedRecentPayments(this.paymentPageNumber, this.paymentPageSize);
  }

  // Load paginated Salary Disbursements
  loadPaginatedSalaryDisbursements(pageNumber: number, pageSize: number): void {
    this.clientService.getPaginatedSalaryDisbursements(pageNumber, pageSize).subscribe(
      (data: any) => {
        console.log(data)
        this.salaryDisbursements = data;
        this.salaryTotalPages = data.totalPages || 1;
        this.filteredSalaryDisbursements = [...this.salaryDisbursements];
        console.log(this.filteredSalaryDisbursements);
        
      },
      error => {
        console.error('Error fetching paginated salary disbursements', error);
      }
    );
  }

  // Load paginated Recent Payments
  loadPaginatedRecentPayments(pageNumber: number, pageSize: number): void {
    this.clientService.getPaginatedRecentPayments(pageNumber, pageSize).subscribe(
      (data: any) => {
        console.log(data);
        this.recentPayments = data;        
        this.paymentTotalPages = data.totalPages || 1;
        this.filteredRecentPayments = [...this.recentPayments];
        
      },
      error => {
        console.error('Error fetching paginated recent payments', error);
      }
    );
  }

  // Handle salary pagination change
  onSalaryPageChange(newPage: number): void {
    this.salaryPageNumber = newPage;
    this.loadPaginatedSalaryDisbursements(this.salaryPageNumber, this.salaryPageSize);
  }

  // Handle payment pagination change
  onPaymentPageChange(newPage: number): void {
    this.paymentPageNumber = newPage;
    this.loadPaginatedRecentPayments(this.paymentPageNumber, this.paymentPageSize);
  }

  // Handle filter change event
  onFilterChange(event: any): void {
    const days = +event.target.value;
    const currentDate = new Date();

    // Filter salary disbursements based on the selected time range
    this.filteredSalaryDisbursements = this.salaryDisbursements.filter(salary => {
      const processedAt = new Date(salary.processedAt);
      return this.calculateDateDifference(processedAt, currentDate) <= days;
    });

    // Filter recent payments based on the selected time range
    this.filteredRecentPayments = this.recentPayments.map(beneficiary => ({
      ...beneficiary,
      paymentsList: beneficiary.paymentsList.filter((payment: { createdAt: Date }) => {
        const createdAt = new Date(payment.createdAt);
        return this.calculateDateDifference(createdAt, currentDate) <= days;
      })
    })).filter(beneficiary => beneficiary.paymentsList.length > 0);
  }

  // Utility method to calculate the difference in days between two dates
  calculateDateDifference(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days
  }

  // Handle payment click for displaying details in a modal
  onPaymentClick(payment: any, beneficiary: any): void {
    const paymentDetails = payment.transactions.length > 0 ? {
      type: 'payment',
      id: payment.id,
      beneficiaryName: beneficiary.benificiaryName,
      amount: payment.amount,
      status: payment.status,
      createdAt: payment.createdAt,
      transactionId: payment.transactions[0].id,
      transactionAmount: payment.transactions[0].transactionAmount,
      transactionStatus: payment.transactions[0].transactionStatus,
      transactionDate: payment.transactions[0].transactionDate,
    } : {
      type: 'payment',
      id: payment.id,
      beneficiaryName: beneficiary.benificiaryName,
      amount: payment.amount,
      status: payment.status,
      createdAt: payment.createdAt,
    };
    this.openDetails(paymentDetails);
  }

  // Handle salary click for displaying details in a modal
  onSalaryClick(salary: any): void {
    const salaryDetails = {
      type: 'salary',
      amount: salary.amount,
      status: salary.status,
      createdAt: salary.createdAt,
      employees: salary.employeeList,
      transactions: salary.transactionList
    };
    this.openDetails(salaryDetails);
  }

  // Open modal with details
  openDetails(data: any): void {
    const modalRef = this.modalService.open(DetailsModalComponent);
    modalRef.componentInstance.data = data;
  }

  // Download CSV of successful transactions
  downloadData(): void {
    const successfulTransactions: any[] = [];

    // Collect successful salary transactions
    this.salaryDisbursements.forEach(salary => {
      if (salary.status === 'Success' && salary.transactionList) {
        salary.employeeList.forEach((employee: { name: string; employeeId: number }) => {
          salary.transactionList.forEach((transaction: { transactionAmount: number, transactionStatus: string, transactionDate: Date, employeePaidId: number }) => {
            if (transaction.employeePaidId === employee.employeeId && transaction.transactionStatus === 'Success') {
              successfulTransactions.push({
                transaction: 'Salary',
                typeEmployeeBeneficiary: employee.name,
                nameTransaction: employee.name,
                amountTransaction: transaction.transactionAmount.toFixed(2),
                statusTransaction: transaction.transactionStatus,
                date: new Date(transaction.transactionDate).toLocaleString(),
              });
            }
          });
        });
      }
    });

    // Collect successful payment transactions
    this.recentPayments.forEach(beneficiary => {
      beneficiary.paymentsList.forEach((payment: { status: string, transactions: any[] }) => {
        if (payment.status === 'Success' && payment.transactions) {
          payment.transactions.forEach(transaction => {
            successfulTransactions.push({
              transaction: 'Payment',
              typeEmployeeBeneficiary: beneficiary.benificiaryName,
              nameTransaction: beneficiary.benificiaryName,
              amountTransaction: transaction.transactionAmount.toFixed(2),
              statusTransaction: transaction.transactionStatus,
              date: new Date(transaction.transactionDate).toLocaleString(),
            });
          });
        }
      });
    });

    if (successfulTransactions.length === 0) {
      alert('No successful transactions to download.');
      return;
    }

    const csvData = this.convertToCSV(successfulTransactions);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'successful_transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Convert transactions to CSV
  private convertToCSV(transactions: any[]): string {
    const headers = ['Transaction', 'Type, Employee/Beneficiary', 'Name, Transaction', 'Amount, Transaction', 'Status, Transaction', 'Date'];
    const rows = transactions.map(transaction => [
      `"${transaction.transaction}"`,
      `"${transaction.typeEmployeeBeneficiary}"`,
      `"${transaction.nameTransaction}"`,
      `"${transaction.amountTransaction}"`,
      `"${transaction.statusTransaction}"`,
      `"${transaction.date}"`
    ].join(","));
    return [headers.join(","), ...rows].join("\n");
  }
}
