import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  private toastSubject = new Subject<string>();
  toastState = this.toastSubject.asObservable();

  showToast(message: string) {
    this.toastSubject.next(message);
  }
}
