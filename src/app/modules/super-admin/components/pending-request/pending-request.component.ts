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
  searchCurrentPage =1;
  getType = "All";

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
      if(this.getType=="All"){
        this.currentPage = event.pageIndex + 1; // Material paginator is zero-indexed
      }
      else{
        this.searchCurrentPage = event.pageIndex +1;
        this.onSearch();
      }
      this.loadClients();

    }

    onSearch(): void {
      const searchTerm = this.searchForm.get('searchTerm')?.value;
      this.getType = "Search";
      if (searchTerm) {
        this.superAdminService.getClientByName(searchTerm,"Pending",this.searchCurrentPage,this.pageSize ).subscribe((clientsByName) => {
          console.log(clientsByName); 
          this.clients = clientsByName.paginatedUser;
          console.log(this.clients);
          
          this.totalClients = clientsByName.count;
        });
      } else {
        this.getType = "All";
        this.clients = this.clientsAll;
      }
    }
}
