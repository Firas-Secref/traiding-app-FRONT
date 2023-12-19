import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/claim.service';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-addclaim',
  templateUrl: './addclaim.component.html',
  styleUrls: ['./addclaim.component.css']
})
export class AddclaimComponent implements OnInit {
  file!: File;
  desc!: string; 
  type!: string;
  
  
  integersList: string[] = []; 
  t: string='';
  
  constructor(private claimService: ClaimService, private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService) { }

  ngOnInit(): void {this.claimService.getListOfIntegers().subscribe(
    (data) => {
      this.integersList = data;
      console.log(data);
    },
    (error) => {
      console.error('Error fetching list of integers:', error);
    }
  );

    
  }
  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  } 
  onSubmit(): void {
    this.claimService.addClaim(this.file, this.desc, this.type,this.t).subscribe(
      response => { alert('claim created successfuly!');
        console.log(response);
        
      },
      error => {
        console.log(error);
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
  onSelectChange(event: Event) {
    this.t = String((event.target as HTMLSelectElement).value);
  }
}
