import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module'; 
import { FormsModule } from '@angular/forms'; 
import { MultiuserResponse } from '../../model/interface/master';  
import { MasterService } from '../../service/master.service';
import { UserList } from '../../model/class/multiuser';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
  totalUser = signal<number>(0);
  userList = signal<UserList[]>([]);
  masterSrv = inject(MasterService);
  userObj: UserList = new UserList();
  isModalVisible = false;

  ngOnInit() {
    this.displayAllUser();
  }

  openModal(user?: UserList) {
    this.isModalVisible = true;
    this.userObj = user ? { ...user } : new UserList();
  }

  closeModal() {
    this.isModalVisible = false;
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

  createUser() {
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
