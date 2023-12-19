import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-stickynav',
  templateUrl: './stickynav.component.html',
  styleUrls: ['./stickynav.component.css']
})
export class StickynavComponent implements OnInit {
 currentUser: any;
  constructor(public userService: UserService,private userAuthService: UserAuthService ,private router: Router) { }

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
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['']);
  }
}
