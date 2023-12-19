import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string[] {
    const rolesString = localStorage.getItem('roles') ?? '[]'; 
    return JSON.parse(rolesString);
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    try {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        return token;
      } else {
        throw new Error('JWT token not found in localStorage.');
      }
    } catch (error) {
      // You can log the error or handle it in some other way (e.g., returning a default value)
      console.error('Error getting JWT token:', error);
      return null;
    }
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Method to retrieve user data from local storage
  public getUser(): any | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
  
}
