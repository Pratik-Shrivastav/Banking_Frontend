import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

  clients: any[] = []; // Array to hold the list of clients
  loading: boolean = true; // Flag to show loading state

  constructor(private superAdminService: SuperAdminService, private router:Router) { }

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

  onCardClick(id:number) {
    this.router.navigate(['SuperAdmin/ViewClient', id])
    }

}
