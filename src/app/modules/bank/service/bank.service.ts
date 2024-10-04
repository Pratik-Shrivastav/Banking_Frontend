import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = 'https://localhost:7005/api/Bank';

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
  public getClientSalaryDisbursementById(id:number): Observable<any> {
    const requestUrl = `${this.apiUrl}/SalaryDisbursement/${id}`;
    return this.httpClient.get<any[]>(requestUrl)   
  }
}
