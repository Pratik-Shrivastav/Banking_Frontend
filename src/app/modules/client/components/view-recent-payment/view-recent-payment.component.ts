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
  count: number = 0; // Initialize count to zero
  pageSize: number = 5;
  pageIndex: number = 1; // Start at pageIndex 0
  payments:any;
  selectedBeneficiary: any = null;
  
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
    this.clientService.getBeneficiariesForOptions(this.pageIndex, this.pageSize).subscribe(
      (data: any) => {
        console.log(data);
        this.beneficiaryList = data.paginatedBeneficiary;
        this.count = data.count; // Ensure count is assigned correctly
      },
      error => {
        console.error('Error fetching paginated recent payments', error);
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
}
