  import { Component, OnInit } from '@angular/core';
  import { ClientService } from '../../service/client.service';
  import { PageEvent } from '@angular/material/paginator';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { DetailsModalComponent } from '../details-modal/details-modal.component';

  @Component({
    selector: 'app-view-recent-payment',
    templateUrl: './view-recent-payment.component.html',
    styleUrls: ['./view-recent-payment.component.css'] // Fixed typo: should be styleUrls not styleUrl
  })
  export class ViewRecentPaymentComponent implements OnInit {
    beneficiaryList: any[] = [];
    count: number = 0;
    
    pageSize: number = 5;
    pageIndex: number = 1;
    searchTerm: string = ''; // New property to store search term
    payments: any;
    selectedBeneficiary: any = null;
    paymentSearchTerm: string = '';

    startDate: string | null = null;
    endDate: string | null = null;


    constructor(private clientService: ClientService,private modalService: NgbModal) {}

    ngOnInit() {
      this.loadBeneficiaryOptions(); // +1 for API call since API may use 1-based index
    }
    togglePaymentPanel(beneficiaryId: number) {
      if (this.selectedBeneficiary && this.selectedBeneficiary.id === beneficiaryId) {
        this.closePaymentPanel();
      } else {
        this.selectedBeneficiary = this.beneficiaryList.find(b => b.id === beneficiaryId);
        this.getPaymentsOfBeneficiary(beneficiaryId, this.pageIndex, this.pageSize); // Fetch payments with pagination starting at page 1
      }
    }
    onPaymentSearchChange() {
      this.getPaymentsOfBeneficiarySearch(this.selectedBeneficiary.id); // Fetch payments with the updated search term
  }

  getPaymentsOfBeneficiarySearch(id: number) {
      this.clientService.getPaymentsForBeneficiaryPaginated(id, this.pageIndex, this.pageSize, this.paymentSearchTerm).subscribe((response) => {
          this.payments = response.paginatedPayments;
          this.count = response.count; // Ensure count is assigned correctly
      });
  }
    onSearchChange() {
      this.pageIndex = 1; // Reset to first page when searching
      this.loadBeneficiaryOptions();
    }
    
    closePaymentPanel() {
      this.selectedBeneficiary = null;
      this.payments = [];
    }
    getPaymentsOfBeneficiary(beneficiaryId: number, pageNumber: number, pageSize: number) {
      this.clientService.getPaymentsForBeneficiary(beneficiaryId, pageNumber, pageSize).subscribe(
        (response) => {
          console.log(response)
          this.payments = response.paginatedPayments; // Set the paginated payment list
          this.count = response.count; // Update the count for the paginator
        },
        (error) => {
          console.error('Error fetching paginated payments:', error);
        }
      );
    }
    
    loadBeneficiaryOptions(): void {
      this.clientService.searchBeneficiaries(this.searchTerm, this.pageIndex, this.pageSize).subscribe(
        (data: any) => {
          this.beneficiaryList = data.paginatedBeneficiaries;
          this.count = data.count;
        },
        error => {
          console.error('Error fetching paginated beneficiaries', error);
        }
      );
    }
    onPaymentPageChange(event: PageEvent) {
      this.getPaymentsOfBeneficiary(this.selectedBeneficiary.id, event.pageIndex + 1, event.pageSize);
    }
    
    onPageChange(event: PageEvent) {
      this.pageIndex = event.pageIndex + 1; // Set pageIndex directly from event
      this.pageSize = event.pageSize;
      this.loadBeneficiaryOptions(); // +1 for API call
    }
    openDetails(data: any): void {
      const modalRef = this.modalService.open(DetailsModalComponent);
      modalRef.componentInstance.data = data;
    }
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
    downloadData(): void {
      // Ensure startDate and endDate are not null before creating Date objects
      const filteredPayments = this.payments.filter((payment: { createdAt: string | number | Date; }) => {
          const paymentDate = new Date(payment.createdAt);
          
          // Check if startDate and endDate are not null before creating Date objects
          const start = this.startDate ? new Date(this.startDate) : null;
          const end = this.endDate ? new Date(this.endDate) : null;

          // If start or end date is null, consider all payments
          if (!start && !end) return true;

          // Check if the payment date is within the selected range
          const afterStart = start ? paymentDate >= start : true;
          const beforeEnd = end ? paymentDate <= end : true;

          return afterStart && beforeEnd;
      });

      if (filteredPayments.length === 0) {
          alert('No payments found for the selected date range.');
          this.startDate='';
          this.endDate='';
          return;
      }

      const csvData = this.convertToCSV(filteredPayments);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recent_payments.csv';
      a.click();
      window.URL.revokeObjectURL(url);
  }

  private convertToCSV(payments: any[]): string {
      const headers = ['Payment Type', 'Amount', 'Status', 'Created At'];
      const rows = payments.map(payment => [
          `"${payment.paymentType}"`,
          `"${payment.amount.toFixed(2)}"`,
          `"${payment.status}"`,
          `"${new Date(payment.createdAt).toLocaleString()}"`,
      ].join(","));

      return [headers.join(","), ...rows].join("\n");
  }
  }
