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
  clientsAll: any; // Hold the clients found by search
  clients: any[] = []; // Array to hold the list of clients
  loading: boolean = true; // Flag to show loading state
  currentPage = 1; // Track the current page
  totalClients = 0; // Total number of clients from the backend
  pageSize = 8; // Number of clients per page

  constructor(private fb: FormBuilder, private superAdminService: SuperAdminService, private router: Router) {
    this.searchForm = this.fb.group({
      searchTerm: [''] 
    });
  }

  ngOnInit(): void {
    this.loadClients(); // Fetch clients when the component initializes
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(debounceTime(500)) // Wait for 300ms pause in events
      .subscribe(() => this.onSearch()); // Trigger search on value changes
  }

  loadClients(): void {
    this.superAdminService.getpaginationClients(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.clientsAll = response.clients;
        this.clients = this.clientsAll // Store the clients returned from the backend
        this.totalClients = response.totalCount; // Store the total count of clients
        this.loading = false; // Hide loading indicator
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
        this.loading = false; // Hide loading indicator in case of error
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1; // Angular Material paginator uses zero-based index
    this.loadClients(); // Fetch clients for the new page
  }

  onCardClick(id: number) {
    this.router.navigate(['SuperAdmin/ViewClient', id]);
  }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    if (searchTerm) {
      this.superAdminService.getClientByName(searchTerm,"Success").subscribe((clientsByName) => {
        this.clients = clientsByName;
      });
    } else {
      this.clients = this.clientsAll;
    }
  }
}
