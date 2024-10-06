import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ToastService } from '../../../../service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperAdminService } from '../../../super-admin/service/super-admin.service';

@Component({
  selector: 'app-rejected-documents',
  templateUrl: './rejected-documents.component.html',
  styleUrl: './rejected-documents.component.css'
})
export class RejectedDocumentsComponent implements OnInit {
 

  client!: any; // Holds the client data
  documents!:any[];
  loading: boolean = true; // Loading indicator
  error: string | null = null; // Error message
  previewUrl!:string

  constructor(
    private route: ActivatedRoute,
    private superAdminService: SuperAdminService,
    private router:Router,
    private loginService:LoginService, private toast:ToastService
    
  ) { }

  ngOnInit(): void {
    
      this.toast.showToast("Your Application has been rejected");
      this.loadClientDetails();
  }


  loadClientDetails(): void {
    this.loginService.getUser().subscribe({ 
      next: (user) => {
        this.client = user.clientObject; 
        this.documents = user.clientObject.documentList;
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
    this.loginService.previewFile(fileName).subscribe(
      (response)=>{
        console.log(response.documentUrl);
        this.previewUrl = response.documentUrl;
        console.log(this.previewUrl);
        
      },
      (err)=>{
        console.log(err);    
      }
    );
  }
  ReUpload(){

  }

}
