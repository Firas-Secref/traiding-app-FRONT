import { Component, OnInit } from '@angular/core';
import { ClaimService } from 'src/app/claim.service';

@Component({
  selector: 'app-claimsuser',
  templateUrl: './claimsuser.component.html',
  styleUrls: ['./claimsuser.component.css']
})
export class ClaimsuserComponent implements OnInit {
  claimsList :any =[];
  
  constructor(private claimService: ClaimService) { }

  ngOnInit(): void {this.claimService.getListOfclaims().subscribe(
    (data) => {
      this.claimsList = data;
      console.log(data);
    },
    (error) => {
      console.error('Error fetching list of integers:', error);
    }
  );
  
  

}

}
