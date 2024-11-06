import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Token } from '@angular/compiler';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // corrected `styleUrl` to `styleUrls`
})
export class HeaderComponent implements OnInit {
  guestDetails: any;
  pageTitle: string = 'Dashboard';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateTitle();
    // if (isPlatformBrowser(this.platformId)) {
    //   // Access localStorage only if running in the browser
    //   const loginType = sessionStorage.getItem('login_type');
    //   console.log(loginType);

    //   const userDetails = sessionStorage.getItem('userDetails');
    //   this.guestDetails = userDetails ? JSON.parse(userDetails) : null;
    // }

    // header name  
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => this.updateTitle());
    
  }

  private updateTitle(): void {
    const route = this.getDeepestChild(this.activatedRoute);
    this.pageTitle = route.snapshot.data['title'] || 'Dashboard';
  }
  
  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    return route.firstChild ? this.getDeepestChild(route.firstChild) : route;
  }

  // view(page: any) {
  //   this.router.navigate([`../Admin/${page}`]);
  // }

  logout() {
    // if (isPlatformBrowser(this.platformId)) {
    // }
    sessionStorage.removeItem('adminToken');
    this.guestDetails = null;
  }
}
