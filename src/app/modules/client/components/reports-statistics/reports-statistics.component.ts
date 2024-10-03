import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Beneficiary } from '../../../../models/beneficiary';
import { Employee } from '../../../../models/employee';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);  // Register Chart.js components

@Component({
  selector: 'app-reports-statistics',
  templateUrl: './reports-statistics.component.html',
  styleUrls: ['./reports-statistics.component.css']
})
export class ReportsStatisticsComponent implements OnInit {
  beneficiariesCount: number = 0;
  employeesCount: number = 0;
  salaryDisbursementStatusCounts: any = {};
  paymentStatusCounts: any = {};

  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('salaryPieChart') salaryPieChart!: ElementRef;
  @ViewChild('paymentPieChart') paymentPieChart!: ElementRef;

  private chartInstance!: Chart;  // Track the chart instance
  private refreshInterval: any; // Store the interval ID

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadData(); // Load data initially
    this.refreshInterval = setInterval(() => {
      this.loadData(); // Reload data every 10 seconds
    }, 30000); // 10 seconds in milliseconds
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval); // Clear the interval on component destroy
  }

  loadData(): void {
    this.getCounts();
    this.getSalaryDisbursements();
    this.getRecentPayments();
  }

  getCounts(): void {
    this.clientService.getBeneficiaries().subscribe(
      (data: Beneficiary[]) => {
        this.beneficiariesCount = data.filter(beneficiary => beneficiary.isActive).length;
        this.createBarChart(); // Create chart after fetching data
      },
      (error) => {
        console.error('Error fetching beneficiaries', error);
      }
    );

    this.clientService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employeesCount = data.filter(employee => employee.isActive).length;
        this.createBarChart(); // Create chart after fetching data
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  getSalaryDisbursements(): void {
    this.clientService.getSalaryDisbursements().subscribe(
      (data: any[]) => {
        this.salaryDisbursementStatusCounts = this.countByStatus(data, 'status');
        this.createSalaryPieChart(); // Create pie chart
      },
      (error) => {
        console.error('Error fetching salary disbursements', error);
      }
    );
  }

  getRecentPayments(): void {
    this.clientService.getRecentPayments().subscribe(
      (data: any[]) => {
        console.log('Recent Payments Data:', data); // Log the data
  
        // Reset the status counts
        this.paymentStatusCounts = {};
  
        // Loop through each beneficiary
        data.forEach(beneficiary => {
          // Loop through each payment in the payments list
          beneficiary.paymentsList.forEach((payment: { status: any; }) => {
            const status = payment.status; // Get the status of the payment
            this.paymentStatusCounts[status] = (this.paymentStatusCounts[status] || 0) + 1; // Count the status
          });
        });
  
        this.createPaymentPieChart(); // Create pie chart
      },
      (error) => {
        console.error('Error fetching recent payments', error);
      }
    );
  }

  countByStatus(data: any[], statusKey: string): any {
    return data.reduce((acc, item) => {
      const status = item[statusKey];
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  }

  createBarChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = this.barChart.nativeElement.getContext('2d');
    
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Employees', 'Beneficiaries'],
        datasets: [{
          label: 'Active Count',
          data: [this.employeesCount, this.beneficiariesCount],
          backgroundColor: ['#42A5F5', '#66BB6A'],
        }]
      },
      options: {
        responsive: true,
      }
    });
  }

  createSalaryPieChart(): void {
    const ctx = this.salaryPieChart.nativeElement.getContext('2d');
    const labels = Object.keys(this.salaryDisbursementStatusCounts);
    const data = Object.values(this.salaryDisbursementStatusCounts);

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Salary Disbursements by Status',
          data: data,
          backgroundColor: [ '#FFCE56','#36A2EB', '#FF6384'],
        }]
      },
      options: {
        responsive: true,
      }
    });
  }

  createPaymentPieChart(): void {
    const ctx = this.paymentPieChart.nativeElement.getContext('2d');
    const labels = Object.keys(this.paymentStatusCounts);
    const data = Object.values(this.paymentStatusCounts);
    
    console.log('Payment Status Counts:', this.paymentStatusCounts); // Log status counts
    
    if (data.length > 0) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Payments by Status',
            data: data,
            backgroundColor: ['#36A2EB','#FFCE56', '#FF6384'],
          }]
        },
        options: {
          responsive: true,
        }
      });
    } else {
      console.error('No data available for payment status counts.');
    }
  }
  downloadStatistics(): void {
    const csvData = this.generateCSV();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reports_statistics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  private generateCSV(): string {
    const header = 'Metric,Count\n';
    const employeeData = `Active Employees,${this.employeesCount}\n`;
    const beneficiaryData = `Active Beneficiaries,${this.beneficiariesCount}\n`;
  
    const salaryStatusData = Object.entries(this.salaryDisbursementStatusCounts)
      .map(([status, count]) => `Salary Disbursement Status,${status},${count}\n`).join('');
  
    const paymentStatusData = Object.entries(this.paymentStatusCounts)
      .map(([status, count]) => `Payment Status,${status},${count}\n`).join('');
  
    return header + employeeData + beneficiaryData + salaryStatusData + paymentStatusData;
  }
  
}
