import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { PageEvent } from '@angular/material/paginator';

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

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadBeneficiaryOptions(); // +1 for API call since API may use 1-based index
  }
  getPaymentsOfBeneficiary(id:number){
    this.clientService.getBeneficiaryById(id).subscribe((response)=>{
      this.payments= response.paymentsList;
    });
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

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1; // Set pageIndex directly from event
    this.pageSize = event.pageSize;
    this.loadBeneficiaryOptions(); // +1 for API call
  }
}
