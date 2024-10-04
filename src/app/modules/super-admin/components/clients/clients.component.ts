import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  searchForm!: FormGroup;
  clients: any[] = []; // Array to hold the list of clients
  loading: boolean = true; // Flag to show loading state
  currentPage = 1; // Track the current page
  totalClients = 0; // Total number of clients from the backend
  pageSize = 8; // Number of clients per page

  constructor(private fb: FormBuilder,private superAdminService: SuperAdminService, private router:Router)
   {
    this.searchForm = this.fb.group({
      searchTerm: [''] // Create a form control for search term
    });
    }

  ngOnInit(): void {
    this.loadClients(); // Fetch clients when the component initializes
  }

  loadClients(): void {
    this.superAdminService.getpaginationClients(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.clients);
        
        this.clients = response.clients; // Store the clients returned from the backend
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

  onCardClick(id:number) {
    this.router.navigate(['SuperAdmin/ViewClient', id])
    }

  searchClient(){
    this.superAdminService.getClientByName(this.searchForm.value.searchTerm).subscribe((clientsByname)=>
      {
        this.clients = clientsByname;
      })
  }

}
