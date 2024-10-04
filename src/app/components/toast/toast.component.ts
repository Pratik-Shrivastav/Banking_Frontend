import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  message: string = '';
  show: boolean = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState.subscribe((message: string) => {
      this.message = message;
      this.show = true;

      // Hide toast after 3 seconds
      setTimeout(() => {
        this.show = false;
      }, 3000);
    });
  }

}
