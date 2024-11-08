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
  Opportunity = signal<any>([]);
  leadList = signal<any>([]);
  dealerData: SingleDealerResponse | undefined;
  masterSrv = inject(MasterService);
 
  showUsersTable: boolean = true; // Initialize to true
  showLeadsTable: boolean = false;
  showOpportunityTable: boolean = false;

  constructor(private route: ActivatedRoute) {}

  selectedOption: string = 'Users';

  handleSelectionChange(event: Event) {

    const option = (event.target as HTMLSelectElement).value;
    this.selectedOption = option;
    switch (option) {
      case 'leads':
        this.toggleLeadsTable();
        this.getAllLeads;
        break;
      case 'users':
        if (this.dealerData) {
          this.getUser(this.dealerData.dealer.dealer_id);
          this.toggleUsersTable();
        } else {
          console.warn("Dealer data is not available.");
        }
        break;
      case 'opportunity':
        this.getAllOpp;
        this.toggleOpportunityTable();
        break;
      // Add more cases for followUps, appointment, etc. if necessary
    }
  }

  
  toggleUsersTable() { 
    this.showUsersTable = true;
    this.showLeadsTable = false;
    this.showOpportunityTable = false;
  }

  toggleLeadsTable() {
    this.showLeadsTable = true;
    this.showUsersTable = false;
    this.showOpportunityTable = false;
  }

  toggleOpportunityTable() {
    this.showOpportunityTable = true;
    this.showUsersTable = false;
    this.showLeadsTable = false;
  }
  


  ngOnInit() {  
    
     
    
    this.route.data.subscribe((data) => {
      this.dealerData = data['dealerData'];
       
      if (this.dealerData) {
        this.getUser(this.dealerData.dealer.dealer_id);
      } else {
        console.warn("Dealer data not available from resolver.");
      }
    });
   
    this.route.paramMap.subscribe((params) => {
      const dealerId = params.get('id');
      if (dealerId) {
        this.getUser(dealerId);
      } else if (!this.dealerData) {
        console.error('Dealer ID not found in the URL and no resolver data.');
      }
    });
  }
  

  getUser(dealerId: string) {
    console.log("Fetching user data for dealerId:", dealerId);
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
        this.leadList.set(res); 
      },
      error: (err) => {
        alert(err.message || 'An error occurred while fetching leads.');
      },
    });
  }

  getAllOpp(dealerId: string){
    this.masterSrv.getAllOpportunities(dealerId).subscribe({
      next: (res: Users[]) => {
        this.leadList.set(res); 
      },
      error: (err) => {
        alert(err.message || 'An error occurred while fetching leads.');
      },
    });
  }

 
}
