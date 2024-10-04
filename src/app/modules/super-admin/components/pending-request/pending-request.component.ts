import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrl: './pending-request.component.css'
})
export class PendingRequestComponent {
  searchForm!: FormGroup;
  clients: any[] = [];
  loading = true;
  totalClients = 0; // The total number of clients in the database
  currentPage = 1; // Current page index (starts at 1)
  pageSize = 8; // Flag to show loading state
  clientsAll: any;

  constructor(private fb:FormBuilder,private superAdminService: SuperAdminService, private router:Router) 
  {
    this.searchForm = this.fb.group({
      searchTerm: [''] 
    });
   }

  ngOnInit(): void {
    this.loadClients(); // Fetch clients when the component initializes
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(debounceTime(500)) 
      .subscribe(() => this.onSearch());
  }

  loadClients(): void {
    this.superAdminService.getpaginationPendingClients(this.currentPage,this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.clients = response.clients;
        this.clientsAll = this.clients
        this.totalClients = response.totalCount
        this.loading = false; // Hide loading indicator
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
        this.loading = false; // Hide loading indicator in case of error
      }
    });
  }

  onCardClick(id:number) {
    this.router.navigate(['SuperAdmin/DisplayPendingClient', id])
    }

    onPageChange(event: any): void {
      this.currentPage = event.pageIndex + 1; // Material paginator is zero-indexed
      this.pageSize = event.pageSize; // Update page size
      this.loadClients(); // Fetch the new page of clients
    }

    onSearch(): void {
      const searchTerm = this.searchForm.get('searchTerm')?.value;
      if (searchTerm) {
        this.superAdminService.getClientByName(searchTerm,"Pending").subscribe((clientsByName) => {
          console.log(clientsByName);
          
          this.clients = clientsByName;
        });
      } else {
        this.clients = this.clientsAll;
      }
    }
}
