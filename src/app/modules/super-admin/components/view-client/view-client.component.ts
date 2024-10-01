import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {
  client: any; // Holds the client data
  loading: boolean = true; // Loading indicator
  error: string | null = null; // Error message

  constructor(
    private route: ActivatedRoute,
    private superAdminService: SuperAdminService
  ) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    if (clientId) {
      this.loadClientDetails(parseInt(clientId));
    }
  }


  loadClientDetails(id: number): void {
    this.superAdminService.getClientById(id).subscribe({ 
      next: (client) => {
        this.client = client; 
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching client details:', err);
        this.error = 'Failed to load client details';
        this.loading = false;
      }
    });
  }
}
