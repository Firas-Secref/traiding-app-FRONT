import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8085';
  private baseUrl = 'http://localhost:8085';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  currentUser: any;

  setUserData(data: any) {
    this.currentUser = data;
  }

  getUserData() {
    return this.currentUser;
  }


  public login(loginData: any) {
    console.log(loginData)
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }
  public roleMatch(allowedRoles: string | any[]): boolean {
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            return true; // Return true if a match is found.
          }
        }
      }
    }

    return false; // Return false if no match is found.
  }
  getusers () : Observable<string[]>{
    return this.httpclient.get<string[]>("http://localhost:8085/afficher")
  }
  getCurrentUser(): Observable<any> {
    return this.httpclient.get<any>(this.PATH_OF_API + '/getcurrentuser');
  }

}
