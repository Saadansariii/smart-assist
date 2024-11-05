import { Component,  Inject, OnInit, PLATFORM_ID  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) { }

  guestDetails:any;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Now it's safe to access localStorage
      const loginType = localStorage.getItem('login_type');
      console.log(loginType);
    }
   const userDetails1:any = localStorage.getItem('userDetails'); 
    this.guestDetails = userDetails1;  
    this.guestDetails = JSON.parse(this.guestDetails);   
  }


  view(page:any){
    this.router.navigate(["../Admin/"+page]); 
  }
  
  logout(){
    localStorage.clear(); 
    this.guestDetails = null;
    this.router.navigate(['/']);  
  } 
  
} 
