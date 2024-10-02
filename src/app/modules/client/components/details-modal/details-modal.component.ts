import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent {
  @Input() data: any; // Receiving data from the parent component

  constructor(public activeModal: NgbActiveModal) {}

  // Method to check if any transactions exist for the employee
  hasTransactions(employeeId: number): boolean {
    return this.data.transactions?.some((t: { employeePaidId: number }) => t.employeePaidId === employeeId) || false;
  }
}
