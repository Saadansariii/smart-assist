import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import {
  DealerResponse,
  MultiuserResponse,
} from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { UserList } from '../../model/class/multiuser';
import { dealers } from '../../model/class/dealers';
import { DealerResolver } from '../../service/dealar-resolver.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  totalUser = signal<number>(0);
  userList = signal<UserList[]>([]);
  // dealerList = signal<dealers[]>([]);
  masterSrv = inject(MasterService);
  userObj: UserList = new UserList();
  dealerObj: dealers = new dealers();
  dealerList = signal<dealers[]>([]);
  totalDealer = signal<number>(0);
  isModalVisible = false;

  ngOnInit() {
    this.displayAllUser();
    this.getAllDealer();
  }

  onPhoneInputChange(value: string) {
    // Convert input value to a number and store it in userObj.phone
    this.userObj.phone = Number(value) || 0; // Default to 0 if input is invalid
  }
  
  openModal(user?: UserList) {
    this.isModalVisible = true;
    this.userObj = user
      ? { ...user, phone: user.phone ? Number(user.phone) : 0 }
      : {
          user_id: '',
          account_id: '',
          name: '',
          phone: 0,
          email: '',
          role: '',
          password: '',
          otp_validated: '',
          otp: '',
          otp_expiration: '',
          dealer_code: 0,
          corporate_id: '',
          dealer_id: '',
        };
  }
  

  closeModal() {
    this.isModalVisible = false;
  }

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

  displayAllUser() {
    this.masterSrv.getMultipleUser().subscribe({
      next: (res: MultiuserResponse) => {
        this.totalUser.set(res.totalUsers);
        this.userList.set(res.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        alert('Failed to fetch users. Please try again later.');
      },
    });
  }

  // createUser() {
  //   this.masterSrv.createNewUser(this.userObj).subscribe({
  //     next: () => {
  //       alert('User created successfully!');
  //       this.isModalVisible = false;
  //       this.displayAllUser();
  //     },
  //     error: (err) => {
  //       alert('Error creating user: ' + err.message);
  //     },
  //   });
  // }

  createUser() {
    if (!this.userObj.phone || isNaN(this.userObj.phone) || this.userObj.phone <= 0) {
      alert('Please enter a valid phone number!');
      return;
    }
  
    this.masterSrv.createNewUser(this.userObj).subscribe({
      next: () => {
        alert('User created successfully!');
        this.isModalVisible = false;
        this.displayAllUser();
      },
      error: (err) => {
        alert('Error creating user: ' + err.message);
      },
    });
  }
  
  

  deleteUserId(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.masterSrv.deleteUser(id).subscribe({
        next: (res) => {
          alert(res.message || 'User deleted successfully');
          this.displayAllUser();
        },
        error: (err) => {
          alert('Error deleting user: ' + err.message);
        },
      });
    }
  }

  onUpdate() {
    this.masterSrv.updateUser(this.userObj).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.isModalVisible = false;
        this.displayAllUser();
      },
      error: (err) => {
        alert('Error updating user: ' + err.message);
      },
    });
  }
}
