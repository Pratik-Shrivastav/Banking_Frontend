import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';  // Adjust path if necessary
import { Beneficiary } from '../../../../models/beneficiary'; // Import the beneficiary model

@Component({
  selector: 'app-view-beneficiaries',
  templateUrl: './view-beneficiary.component.html',
  styleUrls: ['./view-beneficiary.component.css']
})
export class ViewBeneficiariesComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getBeneficiaries();
  }

  getBeneficiaries(): void {
    this.clientService.getBeneficiaries().subscribe(
      (data) => {
        this.beneficiaries = data;
      },
      (error) => {
        console.error('Error fetching beneficiaries', error);
      }
    );
  }
}
