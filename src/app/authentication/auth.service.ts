import { Injectable } from '@angular/core';
//const jwt_decode = require('jwt-decode');
import {jwtDecode} from 'jwt-decode';  // This is the ES module way to import
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getToken(): string | null {
    return localStorage.getItem('Token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  
  hasRole(requiredRole: string): boolean {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Access the role from the claim
      console.log(role);
      if (role) {
        console.log(role);
        return role === requiredRole;  // Check if the role matches
      }
    }
    return false;
  }
  
}


