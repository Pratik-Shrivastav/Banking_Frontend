import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperAdminService } from '../../service/super-admin.service';

@Component({
  selector: 'app-display-pending-client',
  templateUrl: './display-pending-client.component.html',
  styleUrl: './display-pending-client.component.css'
})
export class DisplayPendingClientComponent {
  client!: any; // Holds the client data
  documents!:any[];
  loading: boolean = true; // Loading indicator
  error: string | null = null; // Error message

  constructor(
    private route: ActivatedRoute,
    private superAdminService: SuperAdminService,
    private router:Router
    
  ) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    if (clientId) {
      this.loadClientDetails(parseInt(clientId));
      this.loadDocuments(parseInt(clientId))
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

  loadDocuments(id:number):void{
    this.superAdminService.getDocumentById(id).subscribe({ 
      next: (documents) => {
        this.documents = documents; 
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching client details:', err);
        this.error = 'Failed to load client details';
        this.loading = false;
      }
    });
  }

  downloadFile(fileName: string): void {
    this.superAdminService.downloadFile(fileName);
  }

  ClientStatus(status:string){
    this.superAdminService.clientStatus(this.client.id,status).subscribe(
      (response)=>{
        console.log(response);
        
      },
      (err) => {
        console.error('Error updating Client:', err);
        this.error = 'Failed to Change client statud';
      }
    )
    this.router.navigate(['SuperAdmin'])
  }
}
