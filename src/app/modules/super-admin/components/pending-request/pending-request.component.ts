import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrl: './pending-request.component.css'
})
export class PendingRequestComponent {
  clients: any[] = []; // Array to hold the list of clients
  loading: boolean = true; // Flag to show loading state

  constructor(private superAdminService: SuperAdminService, private router:Router) { }

  ngOnInit(): void {
    this.loadClients(); // Fetch clients when the component initializes
  }

  loadClients(): void {
    this.superAdminService.getObjects().subscribe({
      next: (clients) => {
        this.clients = clients.result.filter((client:any) => client.status !== "Success");
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

}
