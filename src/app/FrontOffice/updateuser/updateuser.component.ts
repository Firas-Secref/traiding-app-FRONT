import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  newPassword1: string = '';
  currentUser: any;
  showOldPassword: boolean = false;
  shownewPassword: boolean = false;
  shownewPassword1: boolean = false;
  constructor(public userService: UserService,private http: HttpClient ,private userAuthService: UserAuthService, ) { }
  

  ngOnInit(): void {this.userService.getCurrentUser().subscribe(
    (user) => {
      this.currentUser = user;
    },
    (error) => {
      // Handle errors, e.g., user not authenticated or other issues
      console.error('Error:', error);
    }
  );
  }
  modifyPassword() {
    
const id= this.currentUser.userId
    const url = `http://localhost:8085/modifier/${id}?oldpassword=${this.oldPassword}&newpassword=${this.newPassword}&newpassword1=${this.newPassword1}`;
    
    this.http.put(url, null).subscribe(
      response => {alert('Password modified successfully!');
        // Handle the response if needed
        console.log('Password modified successfully');
      },
      error => {
        // Handle any errors here
        console.error('Error modifying password', error);
        alert('Please verify your passwords');
      }
    );
  }
}
