import { Component, OnInit } from '@angular/core';
import { ClaimService } from 'src/app/claim.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {

  constructor(private claimservice: ClaimService) { }

  ngOnInit(): void {this.claimservice.reloadOnce();
    
    
  }
close(){
  window.location.reload();
}
}
