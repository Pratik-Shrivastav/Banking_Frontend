import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service'; // Adjust the path as needed
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from '../details-modal/details-modal.component'; // Adjust the path as needed

@Component({
  selector: 'app-transactions',
  templateUrl: './view-recent.component.html',
  styleUrls: ['./view-recent.component.css']
})
export class ViewRecentComponent implements OnInit {
  salaryDisbursements: any[] = []; // Array to hold salary disbursement payments
  recentPayments: any[] = [];       // Array to hold recent payments

  constructor(private clientService: ClientService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadRecentPayments();
    this.loadSalaryDisbursements();
  }

  // Method to load recent payments
  loadRecentPayments(): void {
    this.clientService.getRecentPayments().subscribe(
      (data: any[]) => {
        this.recentPayments = data;
      },
      error => {
        console.error('Error fetching recent payments', error);
      }
    );
  }

  // Method to load salary disbursements
  loadSalaryDisbursements(): void {
    this.clientService.getSalaryDisbursements().subscribe(
      (data: any[]) => {
        this.salaryDisbursements = data;
      },
      error => {
        console.error('Error fetching salary disbursements', error);
      }
    );
  }

  // Method to open the modal with details
  openDetails(data: any) {
    const modalRef = this.modalService.open(DetailsModalComponent);
    modalRef.componentInstance.data = data;
  }

  // Method to handle row click for recent payments
  onPaymentClick(payment: any) {
    const paymentDetails = {
      type: 'payment',
      id: payment.id,
      beneficiaryName: payment.beneficiaryName, // Ensure you have this field
      amount: payment.amount,
      status: payment.status,
      createdAt: payment.createdAt,
    };
    this.openDetails(paymentDetails);
  }

  // Method to handle row click for salary disbursements
  onSalaryClick(salary: any) {
    const salaryDetails = {
      type: 'salary',
      
      amount: salary.amount,
      status: salary.status,
      createdAt: salary.createdAt,
      employees: salary.employeeList, // Ensure this contains employee data
    };
    this.openDetails(salaryDetails);
  }
}
