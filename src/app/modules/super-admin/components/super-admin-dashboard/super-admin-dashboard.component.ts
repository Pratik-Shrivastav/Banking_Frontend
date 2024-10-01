import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../service/super-admin.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css'] // Corrected the property name
})
export class SuperAdminDashboardComponent implements OnInit {
  clients: any[] = []; // Array to hold the list of clients
  loading: boolean = true; // Flag to show loading state

  constructor(private superAdminService: SuperAdminService) { }

  ngOnInit(): void {
    this.loadClients(); // Fetch clients when the component initializes
  }

  loadClients(): void {
    this.superAdminService.getObjects().subscribe({
      next: (clients) => {
        this.clients = clients; // Store the clients
        this.loading = false; // Hide loading indicator
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
        this.loading = false; // Hide loading indicator in case of error
      }
    });
  }
}
