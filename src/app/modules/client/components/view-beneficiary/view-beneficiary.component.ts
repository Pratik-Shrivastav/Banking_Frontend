import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Beneficiary } from '../../../../models/beneficiary';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-view-beneficiaries',
  templateUrl: './view-beneficiary.component.html',
  styleUrls: ['./view-beneficiary.component.css']
})
export class ViewBeneficiariesComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
  displayedBeneficiaries: Beneficiary[] = [];
  totalBeneficiariesCount: number = 0;
  pageSize = 5;
  page = 1;
  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.getBeneficiariesPaged(this.page, this.pageSize);
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.onSearch());
  }

  getBeneficiariesPaged(page: number, pageSize: number): void {
    this.clientService.getBeneficiariesPaged(page, pageSize).subscribe(
      (data: any) => {
        console.log(data);

        this.beneficiaries = data.beneficiaries;
        this.displayedBeneficiaries = this.beneficiaries;
        this.totalBeneficiariesCount = data.totalCount;
        
      },
      (error) => {
        console.error('Error fetching beneficiaries', error);
      }
    );
  }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    if (searchTerm) {
      this.clientService.searchBeneficiariesPaged(searchTerm).subscribe((filteredBeneficiaries) => {
        this.beneficiaries = filteredBeneficiaries;
        this.totalBeneficiariesCount = this.beneficiaries.length;
        this.updateDisplayedBeneficiaries();
      });
    } else {
      this.getBeneficiariesPaged(this.page, this.pageSize);
    }
  }

  updateDisplayedBeneficiaries(): void {
    const startIndex = this.page * this.pageSize;
    this.displayedBeneficiaries = this.beneficiaries.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getBeneficiariesPaged(this.page,this.pageSize);
  }

  deleteBeneficiary(id: number): void {
    if (confirm("Are you sure you want to delete this beneficiary?")) {
      this.clientService.deleteBeneficiary(id).subscribe(() => {
        alert("Beneficiary deleted successfully");
        this.getBeneficiariesPaged(this.page, this.pageSize);
      }, error => {
        console.error("Error deleting beneficiary", error);
      });
    }
  }
}
