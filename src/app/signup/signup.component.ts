import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: any = {};
  file!: File;
  errorMessage: string = '';
  Sucessmessage: string = '';
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
   
  registerUser(SignupForm: NgForm) {
    
    const url = 'http://localhost:8085/registerNewUser';
   
      if (SignupForm.invalid) {
        this.errorMessage = 'Fill all required fields.';
        return; // Don't submit the form if any required field is empty
      }
      const password = SignupForm.value['userPassword'];
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

      if (!passwordRegex.test(password)) {
        this.errorMessage = 'Password must contain at least 8 characters long (letters and numbers).';
        return;
      }
  
  this.http.post(url, SignupForm.value).subscribe(
    (response) => {
      // Handle the response if needed
      console.log('User registered successfully');
      this.Sucessmessage = 'User registered successfully';
      
    },
    (error) => {
      console.log('API Response:', error);

        if (error.status === 404) {
          this.errorMessage = 'Email exists';}
         else {
            this.errorMessage = 'Username exists';
    }
    }
  );
  }
  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  } 
  
}
