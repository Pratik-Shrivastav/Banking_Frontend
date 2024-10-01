import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private apiUrl = 'https://localhost:7005/api/superadmin';
  

  constructor(private httpClient: HttpClient) { }

  // Function to fetch the list of objects
  public getObjects(): Observable<any> {
    const requestUrl = `${this.apiUrl}`;
    return this.httpClient.get<any[]>(requestUrl)   
  }
  
  public getClientById(id:number): Observable<any> {
    const requestUrl = `${this.apiUrl}/${id}`;
    return this.httpClient.get<any[]>(requestUrl)   
  }
}
