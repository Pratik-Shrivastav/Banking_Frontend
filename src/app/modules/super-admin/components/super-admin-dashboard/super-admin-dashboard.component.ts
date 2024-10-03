import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../service/super-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css'] // Corrected the property name
})
export class SuperAdminDashboardComponent {

  constructor(private router:Router) { }
  onClientsClick() {
    this.router.navigate(["SuperAdmin/ViewClients"]);
    }
    onRequestsClick() {
      this.router.navigate(["SuperAdmin/Pending"]);
    }
    onReportClick(){
      this.router.navigate(['SuperAdmin/Reports'])
    }
}
