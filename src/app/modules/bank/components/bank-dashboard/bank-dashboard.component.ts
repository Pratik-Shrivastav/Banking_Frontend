import { Component } from '@angular/core';
import { BankService } from '../../service/bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-dashboard',
  templateUrl: './bank-dashboard.component.html',
  styleUrl: './bank-dashboard.component.css'
})
export class BankDashboardComponent {

  clients: any;
  loading: boolean = true;
  constructor(private bankService:BankService, private router:Router){}
  ngOnInit(): void {
    this.loadClients(); 
  }

  loadClients(): void {
    this.bankService.getObjects().subscribe({
      next: (clients) => {
        this.clients = clients; // Store the clients
        console.log(this.clients);
        
        this.loading = false; // Hide loading indicator
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
        this.loading = false; // Hide loading indicator in case of error
      }
    });
  }

  onPendingCardClick(id:number){
    this.router.navigate(['Bank/PendingClient', id])

  }

  onSuccessCardClick(id:number) {
    this.router.navigate(['Bank/SuccessClient', id])

    }
}
