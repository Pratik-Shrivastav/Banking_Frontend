import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  searchForm!: FormGroup;
  allClients: any[] = []; // Hold all clients returned from the backend
  clients: any[] = []; // Hold the list of clients (filtered or paginated)
  loading: boolean = true; // Loading state
  currentPage = 1; // Current page number
  totalClients = 0; // Total number of clients
  pageSize = 8; // Clients per page
  searchCurrentPage = 1;
  filterType = 'All'; // Track if search is active or not
  totalClientsAll!:number;

  constructor(
    private fb: FormBuilder, 
    private superAdminService: SuperAdminService, 
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.loadClients(); // Load clients on initialization
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(debounceTime(500)) // Debounce search input
      .subscribe(() => this.onSearch()); // Trigger search
  }

  loadClients(): void {
    this.loading = true; // Show loading indicator
    this.superAdminService.getpaginationClients(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.allClients = response.clients;
        this.clients = [...this.allClients]; // Clone the array to prevent reference issues
        this.totalClients = response.totalCount;
        this.totalClientsAll = this.totalClients;
        this.loading = false; // Hide loading indicator
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
        this.loading = false; // Hide loading indicator in case of error
      }
    });
  }

  onPageChange(event: any): void {
    if (this.filterType === 'All') {
      this.currentPage = event.pageIndex + 1; // Adjust for zero-indexing
      this.loadClients();
    } else {
      this.searchCurrentPage = event.pageIndex + 1;
      this.onSearch();
    }
  }

  onCardClick(id: number): void {
    this.router.navigate(['SuperAdmin/ViewClient', id]);
  }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value.trim();
    if (searchTerm) {
      this.loading = true; // Show loading indicator during search
      this.filterType = 'Search';
      this.superAdminService.getClientByName(searchTerm, 'Success', this.searchCurrentPage, this.pageSize).subscribe({
        next: (response) => {

          this.clients = response.paginatedUser.map((user: any) => user.clientObject);             
          this.totalClients = response.count;
          this.loading = false; // Hide loading indicator
        },
        error: (error) => {
          console.error('Error searching clients:', error);
          this.loading = false; // Hide loading indicator in case of error
        }
      });
    } else {
      this.filterType = 'All';
      this.clients = [...this.allClients]; // Reset clients to all
      this.totalClients = this.totalClientsAll; // Reset total client count
    }
  }
}
