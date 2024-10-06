import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { ToastComponent } from '../../../../components/toast/toast.component';
import { ToastService } from '../../../../service/toast.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
  beneficiaryForm!: FormGroup;
  selectedTab = "tab1"
  filterType = 'All';
  inboundClients:any;
  inboundClientsAll:any;
  totalInboundClinets:number=0;
  totalInboundClinetsAll:number=0;
  pageSize = 5;
  currentPage = 1;
  searchCurrentPage = 1;
  loading: boolean = true; 
  searchForm!:FormGroup



  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private toast:ToastService
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.beneficiaryForm = this.fb.group({
      benificiaryName: ['', Validators.required],
      email:['',Validators.required], // Match with the model
      accountDetailsObject: this.fb.group({       // Create a FormGroup for account details
        id: [0],                                   // Optional ID for new account details
        accountNumber: ['', Validators.required,this.clientService.validateAccountNumber()],   // Required field
        ifsc: ['', Validators.required],           // Required field
        branch: ['', Validators.required],  
        accountBalance:0       // Required field
      }),
      createdOn: [new Date().toISOString()],      // Optional if you want to handle it in the backend
      isActive: [true]                            // Default value
    });
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(debounceTime(500)) // Debounce search input
      .subscribe(() => this.onSearch());
  }

  selectTab(tab:string){
      this.selectedTab = tab;
      if(this.selectedTab="tab2"){
        this.loadInBoundClients();
      }
  }

  loadInBoundClients(){
    this.clientService.getAllClients(this.currentPage,this.pageSize).subscribe(
      (response)=>{
        console.log(response);
          this.inboundClients = response.paginatedClients;
          this.inboundClientsAll = this.inboundClients;
          this.totalInboundClinets = response.count;
          this.inboundClientsAll = this.totalInboundClinets;
          this.loading = false;
      },
      (error)=>{
        console.log(error);
        this.toast.showToast("Failed to Load Inbound CLients")
      }
    )
  }

  onPageChange(event: any): void {
    if (this.filterType === 'All') {
      this.currentPage = event.pageIndex + 1; // Adjust for zero-indexing
      this.loadInBoundClients();
    } else {
      this.searchCurrentPage = event.pageIndex + 1;
      this.onSearch();
    }
  }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value.trim();
    if (searchTerm) {
      this.loading = true; // Show loading indicator during search
      this.filterType = 'Search';
      this.clientService.searchInboundClients(searchTerm, this.searchCurrentPage, this.pageSize).subscribe({
        next: (response) => {
          this.inboundClients = response.paginatedClients;        
          this.totalInboundClinets = response.count;
          this.loading = false; // Hide loading indicator
        },
        error: (error) => {
          console.error('Error searching clients:', error);
          this.loading = false; // Hide loading indicator in case of error
        }
      });
    } else {
      this.filterType = 'All';
      this.inboundClients = this.inboundClientsAll; // Reset clients to all
      this.totalInboundClinets = this.totalInboundClinetsAll; // Reset total client count
    }
  }


  onSubmit(): void {
    if (this.beneficiaryForm.valid) {
      const beneficiaryData = this.beneficiaryForm.value; // Get the form value
      
      // Set createdOn date
      beneficiaryData.createdOn = new Date().toISOString(); 
      
      // Logging beneficiaryData for debugging
      console.log('Submitting Beneficiary Data:', beneficiaryData);
      
      this.clientService.addBeneficiary(beneficiaryData).subscribe(
        () => {
          alert("Beneficiary Added Successfully");
          this.router.navigate(['/Client']);  // Navigate back to dashboard after submission
        },
        error => {
          console.error('Error adding beneficiary', error);
          this.toast.showToast("Failed to add Client as Beneficiary");
        }
      );
    } else {
      // Log if the form is invalid
      console.log('Form is invalid', this.beneficiaryForm.errors);
    }
  }

  addAsBeneficiary(clientId:number){
    console.log(clientId);
    
    this.clientService.addInboundBeneficiary(clientId).subscribe(
      ()=>{
        alert("Beneficiary Added Successfully");
        this.router.navigate(['/Client']); 
      },
      error=>{
        console.log(error);
        this.toast.showToast("Failed to add Client as Beneficiary");
      }
    )
  }
  
}
