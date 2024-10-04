import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SuperAdminService } from '../../service/super-admin.service';
import { Client } from '../../../../models/client';
import { Chart } from 'chart.js';
import { Beneficiary } from '../../../../models/beneficiary';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  clients: Client[] = [];
  employeeCount: number = 0;
  pendingClients: number = 0;
  rejectedClients: number = 0;
  successfulClients: number = 0;
  beneficiariesCount: number = 0;

  @ViewChild('clientChart') clientChart!: ElementRef;
  @ViewChild('salaryChart') salaryChart!: ElementRef; // ViewChild for salary chart

  constructor(private superAdminService: SuperAdminService) {}

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData(): void {
    this.superAdminService.getObjects().subscribe(data => {
      this.clients = data.result;
      let count:number=0
      this.clients.map((client)=>{
        count+= client.beneficiaryList.length;
      })
      this.beneficiariesCount=count;
      console.log('Data received from API:', data);
      this.prepareData();
      this.createClientChart();
      this.createSalaryChart(); // Create salary chart after data is prepared
    });
  }

  prepareData() {
    this.employeeCount = this.clients.reduce((count, client) => count + client.employeeList.length, 0);
    this.pendingClients = this.clients.filter(client => client.status === 'Pending').length;
    this.rejectedClients = this.clients.filter(client => client.status === 'Rejected').length;
    this.successfulClients = this.clients.filter(client => client.status === 'Success').length;
  }

  createClientChart() {
    const ctx = this.clientChart.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pending', 'Rejected', 'Success'],
        datasets: [{
          label: 'Clients Status',
          data: [this.pendingClients, this.rejectedClients, this.successfulClients],
          backgroundColor: ['#FF6384', '#36A2EB', '#AAFF00']
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  createSalaryChart() {
    const ctx = this.salaryChart.nativeElement.getContext('2d');

    // Prepare salary disbursement data
    const salaryStatusCount = this.getSalaryStatusCount();
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Success', 'Pending', 'Rejected'],
        datasets: [{
          label: 'Salary Disbursement Status',
          data: [
            salaryStatusCount.success,
            salaryStatusCount.pending,
            salaryStatusCount.rejected
          ],
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getSalaryStatusCount() {
    const statusCount = {
      success: 0,
      pending: 0,
      rejected: 0
    };

    this.clients.forEach(client => {
      client.salaryDisbursementList.forEach(disbursement => {
        if (disbursement.status === 'Success') {
          statusCount.success++;
        } else if (disbursement.status === 'Pending') {
          statusCount.pending++;
        } else if (disbursement.status === 'Rejected') {
          statusCount.rejected++;
        }
      });
    });

    return statusCount;
  }
}
