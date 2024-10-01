import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../../../models/register';
import { Observable } from 'rxjs';
import { Login } from '../../../models/login';
import { LoginResponse } from '../../../models/login-response';

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

}
