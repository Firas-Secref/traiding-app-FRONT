import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClaimService } from 'src/app/claim.service';

import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
  
})
export class ClaimComponent implements OnInit {
data:any =[];
searchQuery!: string;
searchResults:any=[];
pageSize = 5;
  currentPage = 1;
  totalPages = 0;

  constructor(private claimService: ClaimService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getClaimsNow()
    this.calculateTotalPages();
}
  
nextPage() {
  this.currentPage++;
}

prevPage() {
  this.currentPage--;
}
  
    getClaimsNow(){
      this.claimService.getClaims().subscribe(res => {
        console.log(res);
        this.data = res;
        
      });
     
    }
    calculateTotalPages() {
      this.totalPages = Math.ceil(this.data.length / this.pageSize);
    }
  print() {
    this.claimService.print().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    },
    error => {
      console.log(error);
    });
  }

  modifyClaim(id: number, traite: boolean) {
    const url = `http://localhost:8085/claim/modify/${id}?traite=${traite}`;
    this.http.put(url, {}).subscribe(() => {
      alert('claim processed successfuly!');
      this.getClaimsNow();
      console.log('Claim modified successfully');
     
    }, (error) => {
      console.error('Error modifying claim:', error);
    });
  }
  performSearch() {
    const url = `http://localhost:8085/claim/search?ref=${this.searchQuery}`;
    this.http.get<string[]>(url).subscribe(
      data => {
        this.searchResults = data;
        
      },
      error => {
        console.error('Error occurred while searching:', error);
      }
    );
  }
  
  isDateEmpty(date: string): boolean {
    return !date || date.trim() === '';
  }
  
}



