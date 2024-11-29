import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms'; 
import { MasterService } from '../../service/master.service';  
import { DealerResponse } from '../../model/interface/master'; 
import { dealers } from '../../model/class/dealers';
import { ToastrService } from 'ngx-toastr';
 
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
  dealerObj: dealers = new dealers();
  selectedRowCount = 3;
  isLoading = false;
  isModalVisible = false;
  isEditMode: boolean = false;

  private readonly toastr = inject(ToastrService);

  openModal(dealer?: dealers) {
    this.isModalVisible = true;
    this.dealerObj = dealer
      ? { ...dealer } // Populate dealer data for editing
      : {
          // Reset dealerObj for creating a new dealer
          dealer_id: '',
          dealer_name: '',
          dealer_code: null,
          created_at: '',
          updated_at: '',
          corporate_id: '',
        };

    console.log('Modal Opened with dealerObj:', this.dealerObj);
  }

  closeModal() {
    this.isModalVisible = false;
  }

  ngOnInit(): void {
    this.getAllDealer();
  }

  getAllDealer() {
    this.masterSrv.getAllDealer().subscribe(
      (res: DealerResponse) => {
        this.dealerList.set(res.dealer.rows);
        this.totalDealer.set(res.dealer.count);
      },
      (error) => {
        this.toastr.error('You Are ', 'Unauthorized Error'); 
      }
    );
  }

  createNewDealer() {
    this.getAllDealer();
    this.masterSrv.createDealer(this.dealerObj).subscribe(
      (res: dealers) => {
        this.toastr.success('Dealer created successfully!', 'Success');
        // window.location.reload();
        this.isModalVisible = false;
        this.getAllDealer();
      },
      (error) => {
        this.toastr.error('You Are Unauthorized', 'Unauthorized Error');
     
      }
    );
  }

  onUpdate() {
    this.getAllDealer();
    this.masterSrv.updateDealer(this.dealerObj).subscribe(
      (res: dealers) => {
        this.toastr.success('Dealer Edit successfully!', 'Success');  
        this.getAllDealer();
      },
      (error) => {
        this.toastr.error('You Are Unauthorized', 'Unauthorized Error');
        // alert('something happn ');
      }
    );
  }

  onEdit(data: dealers) {
    this.isModalVisible = true;
    this.dealerObj = data;
    console.log(this.dealerObj, 'trueeee----');
  }

  // deleteDealerId(id: string) {
  //   // alert('are u sure')
  //   this.masterSrv.deleteDealer(id).subscribe(
  //     (res) => {
  //       this.toastr.success('Dealer deleted successfully!', 'Success');
  //       window.location.reload();
  //       // alert(res.message);
  //       this.getAllDealer();
  //     },
  //     (error) => {
  //       // this.toastr.error(error.message, 'Fetch Error');
  //       // alert(error.message);
  //     }
  //   );
  // }

  selectedDealerForDeletion: dealers | null = null;

  selectDealerForDeletion(dealer: dealers) {
    this.selectedDealerForDeletion = dealer;
  }

  deleteDealerId() {
    if (
      this.selectedDealerForDeletion &&
      this.selectedDealerForDeletion.dealer_id
    ) {
      this.masterSrv
        .deleteDealer(this.selectedDealerForDeletion.dealer_id)
        .subscribe(
          (res: DealerResponse) => {
            this.getAllDealer();
            this.closeModal(); 
            this.toastr.success('Dealer Deleted' , 'Successful')
          },
          (error) => {
            alert(error.message || 'Failed to delete vehicle');
          }
        );
    } else {
      alert('No vehicle selected for deletion');
    }
  }
}
