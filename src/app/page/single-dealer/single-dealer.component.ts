import { Component, inject, OnInit, signal } from '@angular/core';
import { SingleDealerResponse } from '../../model/interface/master';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from '../../shared/shared.module';
import { MasterService } from '../../service/master.service';
import { Users } from '../../model/class/users';

@Component({
  selector: 'app-single-dealer',
  standalone: true,
  imports: [FormsModule, CommonModule, SharedModule],
  templateUrl: './single-dealer.component.html',
  styleUrls: ['./single-dealer.component.css'], // Corrected this line
})
export class SingleDealerComponent implements OnInit {
  userList = signal<any>([]);
  leadList = signal<any>([]);
  dealerData: SingleDealerResponse | undefined;
  masterSrv = inject(MasterService);

  // Declare showUsersTable as a class property
  showUsersTable: boolean = true; // Initialize to true

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve dealer ID from route parameters
    this.route.paramMap.subscribe((params) => {
      const dealerId = params.get('id');

      if (dealerId) {
        this.getUser(dealerId);
      } else {
        console.error('Dealer ID not found in the URL.');
      }
    });

    // Retrieve dealer data from resolver
    this.route.data.subscribe((data) => {
      this.dealerData = data['dealerData'];
      console.log(this.dealerData, 'Dealer Data from Resolver');
    });
  }

  getUser(dealerId: string) {
    this.masterSrv.getAllUser(dealerId).subscribe({
      next: (res: Users[]) => {
        this.userList.set(res);
        console.log(res, 'Response');
        console.log(dealerId, 'Dealer Id');
      },
      error: (err: any) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  getAllLeads(dealerId: string) {
    this.masterSrv.getAllLead(dealerId).subscribe({
      next: (res: Users[]) => {
        this.leadList.set(res); // Make sure to set leadList
      },
      error: (err) => {
        alert(err.message || 'An error occurred while fetching leads.');
      },
    });
  }

  toggleUsersTable() {
    this.showUsersTable = true;
  }

  // Method to show the leads table
  toggleLeadsTable() {
    this.showUsersTable = false;
  }
}
