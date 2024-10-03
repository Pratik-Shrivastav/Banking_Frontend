import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../../../models/register';
import { debounceTime, map, Observable, of, switchMap, tap } from 'rxjs';
import { Login } from '../../../models/login';
import { LoginResponse } from '../../../models/login-response';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private url= "https://localhost:7005/api/UserAuth";
  constructor(private httpClient:HttpClient) { }

  public Register(registerUser:Register):Observable<any>{
    const requestUrl =`${this.url}/Register`;
    return this.httpClient.post<any>(requestUrl, registerUser)
  }

  login(loginData: Login): Observable<any> {
    const requestUrl =`${this.url}/Login`;
    return this.httpClient.post<LoginResponse>(requestUrl, loginData);
  }

  upload(formData: FormData): Observable<any>{
    const requestUrl =`${this.url}/Upload`;
    return this.httpClient.post<string>(requestUrl,formData);
  }

  getUser():Observable<any>{
    const requestUrl =`${this.url}`;
    return this.httpClient.get<any>(requestUrl);
  }

  checkUsernameNotTaken(username: string): Observable<boolean> {
    // Replace with actual backend API call to check username
    return this.httpClient.get<boolean>(`${this.url}/Usernames/${username}`);
  }

  validateUsername(): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        debounceTime(300),  // Delay to avoid sending too many requests
        switchMap((username) =>
          this.checkUsernameNotTaken(username).pipe(  // Check with backend if username is unique
            tap(response => console.log('Backend response:', response)),  // Log the response from backend
            map(isUnique => (isUnique ? null : { usernameTaken: true }))  // If false, return validation error
          )
        )
      );
    };
  }
  
  
  

}
