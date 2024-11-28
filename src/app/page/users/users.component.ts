import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DealerResponse, MultiuserResponse, UserResponse } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { UserList } from '../../model/class/multiuser';
import { dealers } from '../../model/class/dealers';
import { ToastrService } from 'ngx-toastr'; 
import { AleartSrvService } from '../../service/aleart-srv.service'; 
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel'; 


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TooltipModule,
    FloatLabelModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  totalUser = signal<number>(0);
  userList = signal<UserList[]>([]);
  masterSrv = inject(MasterService);
  userObj: UserList = new UserList();
  dealerObj: dealers = new dealers();
  dealerList = signal<dealers[]>([]);
  totalDealer = signal<number>(0);
  isModalVisible = false;

  constructor(private aleartsrv: AleartSrvService) {}

  private readonly toastr = inject(ToastrService);

  ngOnInit() {
    this.displayAllUser();
    this.getAllDealer();
  }

  onPhoneInputChange(value: string) {
    // Convert input value to a number and store it in userObj.phone
    this.userObj.phone = Number(value) || null; // Default to 0 if input is invalid
  }

  openModal(user?: UserList) {
    this.isModalVisible = true;
    this.userObj = user
      ? { ...user, phone: user.phone ? Number(user.phone) : null }
      : {
          user_id: '',
          account_id: '',
          name: '',
          phone: null,
          email: '',
          role: '',
          password: '',
          otp_validated: '',
          otp: '',
          otp_expiration: '',
          dealer_code: null,
          corporate_id: '',
          dealer_id: '', // Ensure dealer_id is part of the user object
        };
    // If userObj.dealer_id is set, find the corresponding dealer code
    if (this.userObj.dealer_id) {
      const selectedDealer = this.dealerList().find(
        (dealer) => dealer.dealer_id === this.userObj.dealer_id
      );
      if (selectedDealer) {
        this.userObj.dealer_code = selectedDealer.dealer_code; // Bind dealer_code
      }
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }

  getDealerCode(dealerId: string): string {
    const dealer = this.dealerList().find(
      (dealer) => dealer.dealer_id === dealerId
    );
    console.log(this.dealerList);
    return dealer?.dealer_code?.toString() ?? 'N/A';
  }

  getAllDealer() {
    this.masterSrv.getAllDealer().subscribe(
      (res: DealerResponse) => {
        this.dealerList.set(res.dealer.rows);
        this.totalDealer.set(res.dealer.count);
        console.log(res);
      },
      (error) => {
        // this.toastr.error(error, 'Error 123');
        // alert(error.message);
      }
    );
  }

  // getAllDealer() {
  //   this.masterSrv.getAllDealer().subscribe({
  //     next: (res: DealerResponse) => {
  //       this.dealerList.set(res.dealer.rows);
  //       this.totalDealer.set(res.dealer.count);
  //       console.log('Dealers fetched successfully', res);
  //     },
  //     error: (error) => {

  //       console.error('Error fetching dealers', error);
  //       this.toastr.error(error, ' Error Fetch Dealer');
  //       //  alert(error)
  //       this.dealerList.set([]);
  //       this.totalDealer.set(0);
  //     }
  //   });}

  onDealerChange() {
    const selectedDealer = this.dealerList().find(
      (dealer) => dealer.dealer_id === this.userObj.dealer_id
    );
    console.log('Selected Dealer:', selectedDealer);
    if (selectedDealer) {
      this.userObj.dealer_code = selectedDealer.dealer_code;
    }
  }

  displayAllUser() {
    this.masterSrv.getMultipleUser().subscribe({
      next: (res: MultiuserResponse) => {
        this.totalUser.set(res.totalUsers);
        this.userList.set(res.users);
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.toastr.error(err, 'user Error');
      },
    });
  }

  createUser() {
    // Validate phone number and dealer_id before creating the user
    if (
      !this.userObj.phone ||
      isNaN(this.userObj.phone) ||
      this.userObj.phone <= 0
    ) {
      alert('Please enter a valid phone number!');
      return;
    }

    if (!this.userObj.dealer_id) {
      alert('Please select a dealer!');
      return;
    }

    this.masterSrv.createNewUser(this.userObj).subscribe({
      next: () => {
        this.toastr.success('User created successfully!', 'Success');
        this.displayAllUser();
      },
      error: (err) => {
        this.toastr.error(
          'Please Enter The Valid Response',
          'Validation Error'
        );
        // alert('Error creating user: ' + err.message);
      },
    });
  }

  // deleteUserId(id: string) {

  //     this.masterSrv.deleteUser(id).subscribe({
  //       next: (res) => {
  //         this.toastr.success('User deleted successfully!', 'Success');
  //         window.location.reload();
  //         this.displayAllUser();
  //       },
  //       error: (err) => {
  //         this.toastr.error(err, 'Server Error');
  //         console.error('Error deleting user:' + err.message);
  //       },
  //     });

  // }

  selectedUserForDeletion: UserList | null = null;

  selectUserForDeletion(user: UserList) {
    this.selectedUserForDeletion = user;
    this.isModalVisible = false;
  }

  deleteUserId() {
    console.log(
      'this is the select user',
      this.selectUserForDeletion,
      this.selectedUserForDeletion
    );
    if (this.selectedUserForDeletion && this.selectedUserForDeletion.user_id) {
      this.masterSrv.deleteUser(this.selectedUserForDeletion.user_id).subscribe(
        (res: MultiuserResponse) => {
          this.displayAllUser();
        },
        (error) => {
          alert(error.message || 'Failed to delete users');
        }
      );
    } else {
      alert('No users selected for deletion');
    }
  }

  onUpdate() {
    // if (!this.userObj.dealer_id) {
    //   alert('Please select a dealer!');
    //   return;
    // }

    this.masterSrv.updateUser(this.userObj).subscribe({
      next: () => {
        this.toastr.success('User updated Successfully!', 'Success');
        alert('User updated successfully!');
        this.displayAllUser();
      },
      error: (err) => {
        this.toastr.error(err, 'Server Error');
      },
    });
  }
}
