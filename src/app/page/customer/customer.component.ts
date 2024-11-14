import { Component, inject, OnInit, signal } from '@angular/core';
import { Accounts } from '../../model/class/customer';
import { MasterService } from '../../service/master.service';
import {  AccountsResponse } from '../../model/interface/master';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  totalCustomer = signal<number>(0);
  customerList = signal<Accounts[]>([]);
  masterSrv = inject(MasterService);
  customerObj: Accounts = new Accounts();

 

  date: Date | undefined;

  ngOnInit(): void {
    this.displayAllCustomer();
  }

  isModalVisible = false;

  openModal(customer?: Accounts) {
    this.isModalVisible = true;
    this.customerObj = customer
      ? {
          ...customer,
          phone: customer.phone ? Number(customer.phone) : 0,
          mobile: customer.mobile ? Number(customer.mobile) : 0,
        }
      : new Accounts();  
  }
  

  closeModal() {
    this.isModalVisible = false;
  }

  displayAllCustomer() {
    this.masterSrv.getCustomer().subscribe((res: AccountsResponse) => {
      this.totalCustomer.set(res.totalAccounts);
      this.customerList.set(res.accounts);
    });
  }

  createCustomer() { 
    this.customerObj.phone = Number(this.customerObj.phone);
    this.customerObj.mobile = Number(this.customerObj.mobile);
    this.masterSrv.createCustomer(this.customerObj).subscribe(
      (res: AccountsResponse) => {
        alert('new Customer created');
        this.displayAllCustomer();
        this.isModalVisible = false;
      },
      (error) => {
        alert('something went wrong');
      }
    );
  }

  deleteCustomerId(account_id: string) {
    alert('Are you sure you want to delete this customer?');
    this.masterSrv.deleteCustomer(account_id).subscribe(
      (res) => {
        alert('Delete successful');
        this.displayAllCustomer(); // Refresh the customer list
      },
      (error) => {
        console.error('Delete failed:', error); // Log the error for debugging
        alert('Failed to delete customer. Please try again.');
      }
    );
  }
  


  onUpdate() {
    this.displayAllCustomer();
    this.masterSrv.updateCustomer(this.customerObj).subscribe(
      (res: AccountsResponse) => {
        alert('update successfully');
        this.isModalVisible = false;
        this.displayAllCustomer();
      },
      (error) => {
        alert('something happn ');
      }
    );
  }

  onEdit(data: Accounts) {
    this.isModalVisible = true;
    this.customerObj = data;
    console.log(this.customerObj, 'trueeee----');
  }
}
