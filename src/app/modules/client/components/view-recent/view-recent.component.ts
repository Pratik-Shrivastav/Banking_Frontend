import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './view-recent.component.html',
  styleUrls: ['./view-recent.component.css']
})
export class ViewRecentComponent {
  displayFirstComponent = true;

  toggleComponents() {
    this.displayFirstComponent = !this.displayFirstComponent;
  }
}
