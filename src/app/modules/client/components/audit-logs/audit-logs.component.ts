import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { AuditLog } from '../../../../models/auditLogs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css']
})
export class AuditLogComponent implements OnInit {
  auditLogs: AuditLog[] = [];
  errorMessage: string = '';

  constructor( private clientService: ClientService,
    private router: Router,) {}

  ngOnInit(): void {
    this.getAuditLogs();
  }

  getAuditLogs(): void {
    this.clientService.getAuditLogs().subscribe({
      next: (logs) => {
        console.log('Fetched audit logs:', logs); // Log the fetched logs
        this.auditLogs = logs;
      },
      error: (error) => {
        console.error('Error fetching audit logs', error);
        this.errorMessage = 'Unable to fetch audit logs.';
      }
    });
  }
}
