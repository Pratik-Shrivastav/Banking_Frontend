import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Import NgbActiveModal

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent {
  @Input() data: any; // Data passed from the parent component

  constructor(public activeModal: NgbActiveModal) {} // Inject NgbActiveModal for modal control
}
