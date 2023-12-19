import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  
  currentUser: any;
  fileInputClicked: boolean = false;
  file!: File;
  constructor(private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,private http: HttpClient,) { }

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
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }
  
  
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['']);
  }
  onFileSelected(event: any): void {
    this.fileInputClicked = true;
    this.file = event.target.files[0];
  } 

  
  triggerFileInput() {
    document.getElementById('fileInput')?.click();
}
      uploadPhoto() {
        if (this.file) {
          const formData = new FormData();
          formData.append('file', this.file);
          const id= this.currentUser.userId
          // Send the formData to your Spring Boot endpoint
          this.http.put(`http://localhost:8085/changeph/${id}`, formData).subscribe(
            response => {
              // Handle the response if needed
              console.log('Photo changed successfully');
              alert('Photo changed successfully');
              // Update the user's profile photo in your component
              // this.storedUser.userphoto = response.updatedPhoto; // Update this line
            },
            error => {
              // Handle any errors here
              console.error('Error changing photo', error);
              alert('Error changing photo');
            }
          );
        }
      }
}
