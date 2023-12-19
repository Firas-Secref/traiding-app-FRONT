import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email: string = '';
  errorMessage: string = '';
  Sucessmessage: string = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  sendPasswordResetRequest() {
    const url = `http://localhost:8085/forgot/${this.email}`;
    this.http.post(url,null).subscribe(
      response => {
        // Handle the response if needed
        console.log('Password reset request sent successfully');
        this.Sucessmessage = 'Password reset request sent successfully';
      },
      error => {
        // Handle any errors here
        console.error('Error sending password reset request', error);
        this.errorMessage = 'Email not found';
      }
    );
  }
}
