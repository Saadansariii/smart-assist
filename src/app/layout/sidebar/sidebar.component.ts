import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
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
