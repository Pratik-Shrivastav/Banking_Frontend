import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperAdminService } from '../../../super-admin/service/super-admin.service';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-view-client-pending',
  templateUrl: './view-client-pending.component.html',
  styleUrl: './view-client-pending.component.css'
})
export class ViewClientPendingComponent {
  client!: any; // Holds the client data
  documents!:any[];
  loading: boolean = true; // Loading indicator
  error: string | null = null; // Error message
  previewUrl!:string;

  constructor(
    private route: ActivatedRoute,
    private bankService: BankService
  ) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('clientId');
    if (clientId) {
      this.loadClientDetails(parseInt(clientId));
      this.loadDocuments(parseInt(clientId))
    }
  }


  loadClientDetails(id: number): void {
    this.bankService.getClientById(id).subscribe({ 
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
    this.bankService.getDocumentById(id).subscribe({ 
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

  previewFile(fileName: string): void {
    this.bankService.previewFile(fileName).subscribe(
      (response)=>{
        console.log(response);
        
        this.previewUrl = response.documentUrl;
      },
      (err)=>{
        console.log(err);    
      }
    );
  }

}
