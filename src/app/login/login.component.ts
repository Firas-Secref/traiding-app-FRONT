import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
       
console.log(response)
const currentUser = {
  username: response.user.userName,
  email: response.user.email,
  userid:response.user.userId,
  userphoto:response.user.userPhoto
  
};

console.log(currentUser)
this.userService.setUserData(currentUser);
        const role = response.user.role[0].roleName;
        if (role === 'User') {
          this.router.navigate(['/user']);
        } else{
          this.router.navigate(['/forbidden'])
        }
        
      },
      (error:any) => {
        console.log('API Response:', error);

        if (error.status === 401) {
          this.errorMessage = 'Invalid Credentials';}
         else if (error.status === 404) {
            this.errorMessage = 'Username not found';
    } else{
      this.errorMessage = 'Account blocked';
    }
}
    );
  }
}
