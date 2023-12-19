import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data:any =[];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  searchQuery!: string;
  searchResults:any=[];
  constructor(private userService: UserService,private http:HttpClient) { }

  ngOnInit(): void {this.getUsersNow();
    this.calculateTotalPages();
  }
  getUsersNow(){
    this.userService.getusers().subscribe(res => {
      console.log(res);
      this.data = res;
      
    });
}
calculateTotalPages() {
  this.totalPages = Math.ceil(this.data.length / this.pageSize);
}
nextPage() {
  this.currentPage++;
}

prevPage() {
  this.currentPage--;
}

Blockuser(userId: number) {
  const url = `http://localhost:8085/block/${userId}`;
  this.http.post(url, {}).subscribe(() => {
    alert('user blocked successfuly!');
    this.getUsersNow();
    console.log('user blocked successfully');
   
  }, (error) => {
    console.error('Error modifying claim:', error);
  });
}
Unblockuser(userId: number) {
  const url = `http://localhost:8085/unblock/${userId}`;
  this.http.post(url, {}).subscribe(() => {
    alert('user unblocked successfuly!');
    this.getUsersNow();
    console.log('user unblocked successfully');
   
  }, (error) => {
    console.error('Error modifying claim:', error);
  });
}
performSearch() {
  const url = `http://localhost:8085/search?ref=${this.searchQuery}`;
  this.http.get<string[]>(url).subscribe(
    data => {
      this.searchResults = data;
      
    },
    error => {
      console.error('Error occurred while searching:', error);
    }
  );
}
}