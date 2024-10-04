import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from '../../../models/employee'; 
import { AuditLog } from '../../../models/auditLogs';  // Import the employee model
import { Beneficiary, BeneficiaryPaymentRequest, Payment } from '../../../models/beneficiary';  // Import the beneficiary model

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://localhost:7005/api/Client';  // Base URL for the API

  constructor(private http: HttpClient) { }

  // Method to add a new employee
  addEmployee(employee: Employee): Observable<Employee> {
    console.log(employee);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(`${this.apiUrl}/Employee`, employee, { headers });
  }

  // Method to add a new beneficiary
  addBeneficiary(beneficiary: Beneficiary): Observable<Beneficiary> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Beneficiary>(`${this.apiUrl}/Beneficiary`, beneficiary, { headers });
  }

  // Get all employees (for future use)
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/Employees`);
  }

  getEmployeesPaged(page: number, pageSize: number): Observable<any> {
    const params = {
      page,
      pageSize
    };
    
    return this.http.get<any>(`${this.apiUrl}/Employees`, { params });
  }
  
  // Get all beneficiaries (for future use)
  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${this.apiUrl}/Beneficiaries`);
  }

  // Get employee by ID (for future use)
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/Employee/${id}`);
  }

  // Get beneficiary by ID (for future use)
  getBeneficiaryById(id: number): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${this.apiUrl}/Beneficiary/${id}`);
  }

  // Update employee (for future use)
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Employee>(`${this.apiUrl}/Employee/${id}`, employee, { headers });
  }

  // Update beneficiary (for future use)
  updateBeneficiary(id: number, beneficiary: Beneficiary): Observable<Beneficiary> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Beneficiary>(`${this.apiUrl}/Beneficiary/${id}`, beneficiary, { headers });
  }

  // Delete employee (for future use)
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Employee/${id}`);
  }

  // Delete beneficiary (for future use)
  deleteBeneficiary(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Beneficiary/${id}`);
  }

  // Disburse salaries
  disburseSalaries(salaryDisbursementRequest: { amount: number; employeeIds: number[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/disburse-salaries`, salaryDisbursementRequest);
  }
  makePayment(payment: Payment, beneficiaryId: number): Observable<Payment> {
    // Create the request object including beneficiaryId
    const request: BeneficiaryPaymentRequest = {
        beneficiaryId: beneficiaryId,
        paymentType: payment.paymentType,
        amount: payment.amount
    };

    console.log('Request payload:', request); // Log the entire request payload

    return this.http.post<Payment>(`${this.apiUrl}/Beneficiary/Payment`, request);
}
getRecentPayments(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/Payments/Recent`); // Adjust the URL as needed
}

getSalaryDisbursements(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/Payments/SalaryDisbursements`); // Adjust the URL as needed
}
getAuditLogs(): Observable<AuditLog[]> {
  return this.http.get<AuditLog[]>(`${this.apiUrl}/auditlogs`).pipe(
    catchError(this.handleError)
  );
}

private handleError(error: any): Observable<never> {
  console.error('An error occurred while fetching audit logs', error);
  return throwError('Something went wrong; please try again later.');
}

}
