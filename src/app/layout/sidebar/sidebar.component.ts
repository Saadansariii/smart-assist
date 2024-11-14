import { Component,ChangeDetectionStrategy  } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SidebarComponent {

  constructor(private router: Router) { }

  view(page: any) {
    this.router.navigate(["../Admin/" + page]);
  }

  view2(page: string, status: string, title: string) {
    this.router.navigate(['../Admin/' + page, { type: status, title: title }]).then(() => { 
        window.scroll({ top: 0, left: 0, behavior: 'smooth' }); 

    });
}
}
