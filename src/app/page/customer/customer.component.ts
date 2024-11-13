import { Component, inject, OnInit, signal } from '@angular/core';
import { Customers } from '../../model/class/customer';
import { MasterService } from '../../service/master.service';
import { CustomerResponse } from '../../model/interface/master';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from '../../shared/shared.module'; 
import { FormsModule } from '@angular/forms';  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,
    SharedModule, 
    FormsModule ,MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,ReactiveFormsModule, CalendarModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent  implements OnInit{
  totalCustomer = signal<number>(0);
  customerList = signal<Customers[]>([]);
  masterSrv = inject(MasterService);
  customerObj: Customers = new Customers();

 
  items: any;

 
 

  date: Date | undefined;

  ngOnInit(): void {
    this.displayAllCustomer(); 
    
  }

  isModalVisible = false;

  openModal( customer?: Customers) {
    this.isModalVisible = true;
    this.customerObj = customer
      ? { ...customer }
      : {
        cust_id: '',
        cust_fname: '',
        cust_lname: '',
        cust_email: '',
        cust_phone: '',
        updated_by: '', 
        };
  }

  closeModal() {
    this.isModalVisible = false;
  }

  

  displayAllCustomer() {
    this.masterSrv.getCustomer().subscribe((res: CustomerResponse) => {
      this.totalCustomer.set(res.totalCustomers);
      this.customerList.set(res.customers);
    });
  }

  createCustomer() {
    this.masterSrv.createCustomer(this.customerObj).subscribe(
      (res: CustomerResponse) => {
        alert('new vehicle created');
        this.displayAllCustomer();  
        this.isModalVisible = false;
      },
      (error) => {
        alert('something was wrong');
      }
    );
  }

  deleteCustomerId(id: string) {
    alert('r u ok ');
    this.masterSrv.deleteCustomer(id).subscribe(
      (res) => {
        alert('delete successful');
        this.displayAllCustomer();
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  onUpdate() {
    this.displayAllCustomer();
    this.masterSrv.updateCustomer(this.customerObj).subscribe(
      (res: CustomerResponse) => {
        alert('update successfully');
        this.isModalVisible = false;
        this.displayAllCustomer();
      },
      (error) => {
        alert('something happn ');
      }
    );
  }
  // displayAllCustomer() {
  //   throw new Error('Method not implemented.');
  // }

  onEdit(data: Customers) {
    this.isModalVisible = true;
    this.customerObj = data;
    console.log(this.customerObj, 'trueeee----');
  }

}
