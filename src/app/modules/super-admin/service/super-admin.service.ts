import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private apiUrl = 'https://localhost:7005/api/SuperAdmin';
  

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

  public getDocumentById(id:number):Observable<any>{
    const requestUrl = `${this.apiUrl}/Document/${id}`;
    return this.httpClient.get<any[]>(requestUrl)   
  }

  public downloadFile(fileName: string): void {
    this.httpClient
      .get(`${this.apiUrl}/Download/${fileName}`, { responseType: 'blob' })
      .subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Download error:', error);
      });
  }

  public clientStatus(id:number,status:string):Observable<any>{
    const requestUrl = `${this.apiUrl}/ClientStatus/${id}`;
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.put(requestUrl,JSON.stringify(status),{headers});
  }

  public paymentStatus(id:number,status:string,clientId:number):Observable<any>{
    const requestUrl = `${this.apiUrl}/PaymentStatus/${clientId}/${id}`;
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.put(requestUrl,JSON.stringify(status),{headers});
  }

  public getClientSalaryDisbursementById(id:number): Observable<any> {
    const requestUrl = `${this.apiUrl}/SalaryDisbursement/${id}`;
    return this.httpClient.get<any[]>(requestUrl)   
  }

  public salaryDisbursementStatus(id:number,status:string,clientId:number):Observable<any>{
    const requestUrl = `${this.apiUrl}/SalaryDisbursementStatus/${clientId}/${id}`;
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.put(requestUrl,JSON.stringify(status),{headers});
  }

}
