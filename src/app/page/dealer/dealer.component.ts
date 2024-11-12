import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { MasterService } from '../../service/master.service';  
import { DealerResponse } from '../../model/interface/master'; 
import { dealers } from '../../model/class/dealers';
 
@Component({
  selector: 'app-dealer',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css'],
})
export class DealerComponent implements OnInit {
  private http = inject(HttpClient); 
  dealerList = signal<dealers[]>([]);
  totalDealer = signal<number>(0);
  masterSrv = inject(MasterService);
  dealerObj : dealers = new dealers(); 
  selectedRowCount = 3;
  isLoading = false;
  // newDistributorList: Distributors = new Distributors();
  isModalVisible = false;
  isEditMode: boolean = false;
  

  openModal(dealer?: dealers) {
    this.isModalVisible = true;
    this.dealerObj = dealer
      ? { ...dealer }  // Populate dealer data for editing
      : {              // Reset dealerObj for creating a new dealer
          dealer_id: '',
          dealer_name: '',
          dealer_code: '',
          created_at: '',
          updated_at: '',
          corporate_id: '',
        };
  
    console.log("Modal Opened with dealerObj:", this.dealerObj);
  }
  
  closeModal() {
    this.isModalVisible = false;
  }
  
  

  rowOptions = [1, 2, 5, 10, 20, 30, 50];

  ngOnInit(): void {
    // this.fetchDealerData();
    this.getAllDealer();

  }

   
  

  // fetchDealerData() {
  //   const token = sessionStorage.getItem('adminToken');
  //   const apiUrl = 'https://dinosaur-cute-lightly.ngrok-free.app/api/superAdmin/distributors/all';
  //   const headers = new HttpHeaders()
  //     .set('authorization', `Bearer ${token}`)
  //     .set('accept', 'application/json');
  //     this.isLoading = true;

  //     this.http.get<DistributorResponse>(apiUrl, { headers }).subscribe({
  //       next: (response) => {
  //         this.isLoading = false; // Set loading to false after data is fetched
  //         if (response && response.distributors) {
  //           this.users = response.distributors;
  //           this.updateDisplayedUsers();
  //           console.log('Dealer data fetched successfully:', this.users);
  //         } else {
  //         console.error('Unexpected response structure:', response);
  //       }
  //     },
  //     error: (error) => {
  //       // this.isLoading = false; // Set loading to false if there is an error
  //       console.error('Error fetching dealer data:', error);
  //     }
  //   });
  // }

  

  getAllDealer() {
    this.masterSrv.getAllDealer().subscribe(
      (res: DealerResponse) => {
        this.dealerList.set(res.dealer.rows);
        this.totalDealer.set(res.dealer.count);
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  // createNewDist() {
  //   this.masterSrv.createDist(this.newDistributorList).subscribe(
  //     (res: any) => {
  //       alert('new Distributor Created');
  //       this.newDistributorList = new Distributors();
  //     },
  //     (error) => {
  //       alert('server Error');
  //     }
  //   );
  // }

  createNewDealer() {
    this.getAllDealer();
    this.masterSrv.createDealer(this.dealerObj).subscribe(
      (res: dealers) => {
        alert('Create New Dealer successfully');
        this.isModalVisible = false; 
        this.getAllDealer(); 
      },
      (error) => {
        alert('something happn ');
      }
    );
  }

  onUpdate() {
    this.getAllDealer();
    this.masterSrv.updateDealer(this.dealerObj).subscribe(
      (res: dealers) => {
        alert('update successfully');
        this.isModalVisible = false; 
      },
      (error) => {
        alert('something happn ');
      }
    );
  }

  onEdit(data: dealers){
    this.isModalVisible = true;
    this.dealerObj = data;
    console.log(this.dealerObj, 'trueeee----');
  }

  deleteDealerId(id: string) { 
    alert('are u sure')
    this.masterSrv.deleteDealer(id).subscribe(
      (res) => {
        alert(res.message);
        this.getAllDealer();
      },
      (error) => {
        alert(error.message);
      }
    );
  }
}
