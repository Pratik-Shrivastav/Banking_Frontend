import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Beneficiary } from '../../../../models/beneficiary';
import { MatPaginator } from '@angular/material/paginator'; // Import MatPaginator
import { PageEvent } from '@angular/material/paginator'; // Import PageEvent

@Component({
  selector: 'app-view-beneficiaries',
  templateUrl: './view-beneficiary.component.html',
  styleUrls: ['./view-beneficiary.component.css']
})
export class ViewBeneficiariesComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
  displayedBeneficiaries: Beneficiary[] = []; // To store the paginated data
  pageSize = 5; // Number of entries per page
  pageIndex = 0; // Current page index

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Get the paginator reference

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getBeneficiaries();
  }

  getBeneficiaries(): void {
    this.clientService.getBeneficiaries().subscribe(
      (data: Beneficiary[]) => {
        this.beneficiaries = data.filter(beneficiary => beneficiary.isActive);
        this.updateDisplayedBeneficiaries(); // Update displayed beneficiaries after fetching
      },
      (error) => {
        console.error('Error fetching beneficiaries', error);
      }
    );
  }

  updateDisplayedBeneficiaries() {
    const startIndex = this.pageIndex * this.pageSize;
    this.displayedBeneficiaries = this.beneficiaries.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex; // Update page index
    this.pageSize = event.pageSize; // Update page size
    this.updateDisplayedBeneficiaries(); // Update displayed beneficiaries
  }

  deleteBeneficiary(id: number): void {
    if (confirm("Are you sure you want to delete this beneficiary?")) {
      this.clientService.deleteBeneficiary(id).subscribe(() => {
        alert("Beneficiary deleted successfully");
        this.getBeneficiaries(); // Refresh the list
      }, error => {
        console.error("Error deleting beneficiary", error);
      });
    }
  }
}
