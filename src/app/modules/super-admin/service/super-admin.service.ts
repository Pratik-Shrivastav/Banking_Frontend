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

  public previewFile(fileName: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.apiUrl}/Download/${fileName}`);
  }

  public clientStatus(id:number,status:string):Observable<any>{
    const requestUrl = `${this.apiUrl}/ClientStatus/${id}`;
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.put(requestUrl,JSON.stringify(status),{headers});
  }

  public paymentStatus(id:number,benificiaryId:number,status:string,clientId:number):Observable<any>{
    const requestUrl = `${this.apiUrl}/PaymentStatus/${clientId}/${benificiaryId}/${id}`;
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
