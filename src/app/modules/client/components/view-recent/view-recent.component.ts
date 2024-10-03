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

  filteredSalaryDisbursements: any[] = [];  // Filtered Salary Disbursements
  filteredRecentPayments: any[] = [];       // Filtered Recent Payments

  constructor(private clientService: ClientService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadRecentPayments();
    this.loadSalaryDisbursements();
  }

  // Load Salary Disbursements
  loadSalaryDisbursements(): void {
    this.clientService.getSalaryDisbursements().subscribe(
      (data: any[]) => {
        this.salaryDisbursements = data;
        this.filteredSalaryDisbursements = data; // Set initially
      },
      error => {
        console.error('Error fetching salary disbursements', error);
      }
    );
  }

  // Load Recent Payments
  loadRecentPayments(): void {
    this.clientService.getRecentPayments().subscribe(
      (data: any[]) => {
        this.recentPayments = data;
        this.filteredRecentPayments = data; // Set initially
      },
      error => {
        console.error('Error fetching recent payments', error);
      }
    );
  }

  // Handle filter change event
  onFilterChange(event: any): void {
    const days = +event.target.value; // Get the selected filter (1, 30, 60, 365)
    const currentDate = new Date();
  
    // Filter salary disbursements for the selected time range
    this.filteredSalaryDisbursements = this.salaryDisbursements.filter(salary => {
      const processedAt = new Date(salary.processedAt);
      return this.calculateDateDifference(processedAt, currentDate) <= days;
    });
  
    // Filter recent payments for the selected time range
    this.filteredRecentPayments = this.recentPayments.map(beneficiary => ({
      ...beneficiary,
      paymentsList: beneficiary.paymentsList.filter((payment: { createdAt: string | number | Date; }) => {
        const createdAt = new Date(payment.createdAt);
        return this.calculateDateDifference(createdAt, currentDate) <= days;
      })
    })).filter(beneficiary => beneficiary.paymentsList.length > 0);
  }
  
  // Utility method to calculate the difference in days between two dates
  calculateDateDifference(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert time difference to days
  }
  
  // Methods to open modals and handle clicks
  onPaymentClick(payment: any,beneficiary:any): void {
    let paymentDetails={};
    if(payment.transactions.length > 0){
       paymentDetails = {
        type: 'payment',
        id: payment.id,
        beneficiaryName: beneficiary.benificiaryName, 
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt,
        
        transactionId:payment.transactions[0].id,
        transactionAmount:payment.transactions[0].transactionAmount,
        transactionStatus:payment.transactions[0].transactionStatus,
        transactionDate:payment.transactions[0].transactionDate,
      }; 
    }
    else{ paymentDetails = {
      type: 'payment',
      id: payment.id,
      beneficiaryName: beneficiary.benificiaryName, 
      amount: payment.amount,
      status: payment.status,
      createdAt: payment.createdAt,
      
      // transactionId:payment.transactions[0].id,
      // transactionAmount:payment.transactions[0].transactionAmount,
      // transactionStatus:payment.transactions[0].transactionStatus,
      // transactionDate:payment.transactions[0].transactionDate,


    };}
    
    console.log(payment);
    
    this.openDetails(paymentDetails);
  }



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

  openDetails(data: any): void {
    const modalRef = this.modalService.open(DetailsModalComponent);
    modalRef.componentInstance.data = data;
  }

  // Download functionality remains unchanged
  downloadData(): void {
    const successfulTransactions: any[] = [];
  
    // Collect successful transactions from salary disbursements
    this.salaryDisbursements.forEach(salary => {
      if (salary.status === 'Success' && salary.transactionList) {
        salary.employeeList.forEach((employee: { name: string; employeeId: number; }) => {
          salary.transactionList.forEach((transaction: { transactionAmount: any; transactionStatus: any; transactionDate: any; employeePaidId: number; }) => {
            if (transaction.employeePaidId === employee.employeeId && transaction.transactionStatus === 'Success') {
              successfulTransactions.push({
                transaction: 'Salary',
                typeEmployeeBeneficiary: employee.name, // Use full name as it is
                nameTransaction: employee.name, // Name of the transaction (full name)
                amountTransaction: transaction.transactionAmount,
                statusTransaction: transaction.transactionStatus,
                date: transaction.transactionDate
              });
            }
          });
        });
      }
    });
  
    // Collect successful transactions from recent payments
    this.recentPayments.forEach(beneficiary => {
      beneficiary.paymentsList.forEach((payment: { status: string; transactions: any[]; }) => {
        if (payment.status === 'Success' && payment.transactions) {
          payment.transactions.forEach(transaction => {
            successfulTransactions.push({
              transaction: 'Payment',
              typeEmployeeBeneficiary: beneficiary.benificiaryName, // Use full name as it is
              nameTransaction: beneficiary.benificiaryName, // Name of the transaction (full name)
              amountTransaction: transaction.transactionAmount,
              statusTransaction: transaction.transactionStatus,
              date: transaction.transactionDate
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

  // Convert to CSV (remains unchanged)
  private convertToCSV(transactions: any[]): string {
    const headers = ['Transaction', 'Type, Employee/Beneficiary', 'Name, Transaction', 'Amount, Transaction', 'Status, Transaction', 'Date'];
  
    // Create rows with the required format, ensuring to wrap values in quotes
    const rows = transactions.map(transaction => [
      `"${transaction.transaction}"`,  // Transaction type
      `"${transaction.typeEmployeeBeneficiary}"`, // Employee/Beneficiary Name
      `"${transaction.nameTransaction}"`, // Name of the transaction
      `"${transaction.amountTransaction.toFixed(2)}"`, // Amount with two decimal places
      `"${transaction.statusTransaction}"`, // Status of the transaction
      `"${new Date(transaction.date).toLocaleString()}"` // Format the date properly
    ].join(",")); // Join the row elements with a comma
  
    // Combine headers and rows
    return [headers.join(","), ...rows].join("\n"); // Join headers with a comma, then join all rows with new lines
  }

  
}





