import { Component, inject, OnInit, signal } from '@angular/core';
import { Accounts } from '../../model/class/customer';
import { MasterService } from '../../service/master.service';
import {  AccountsResponse, DealerResponse } from '../../model/interface/master';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dealers } from '../../model/class/dealers';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

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
    BreadcrumbModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModalModule
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
  dealerObj: dealers = new dealers();
  dealerList = signal<dealers[]>([]);
  useForm : FormGroup

  constructor(private modalService : NgbModalModule){
    this.useForm = new FormGroup({
      account_type: new FormControl(this.customerObj.account_type, [
        Validators.required,
      ]),
      fname: new FormControl(this.customerObj.fname, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lname: new FormControl(this.customerObj.lname, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.customerObj.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.customerObj.phone, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\d+$/), // Ensures only numeric input
      ]),
      mobile: new FormControl(this.customerObj.mobile, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^\d+$/), // Ensures only numeric input
      ]),
      dealer_code: new FormControl(this.customerObj.dealer_code, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

  }

  private readonly toastr = inject(ToastrService);
  ngOnInit(): void {
    this.displayAllCustomer();
   this.getAllDealer();
  }

  
  isModalVisible = false;

  openModal(customer?: Accounts) {
     
    this.isModalVisible = true;
    this.customerObj = customer
      ? {
          ...customer,
          phone:     Number(customer.phone) ,
          mobile:   Number(customer.mobile) ,
        }
      : new Accounts();

      this.useForm.reset({
        account_type: this.customerObj.account_type || '',
        fname: this.customerObj.fname || '',
        lname: this.customerObj.lname || '',
        email: this.customerObj.email || '',
        phone: this.customerObj.phone || '',
        mobile: this.customerObj.mobile || '',
        dealer_code: this.customerObj.dealer_code || '',
      });
  }

  closeModal() {
     ($('.bd-example-modal-lg') as any).modal('hide');
    // this.isModalVisible = false;
  }

  displayAllCustomer() {
    this.masterSrv.getCustomer().subscribe((res: AccountsResponse) => {
      this.totalCustomer.set(res.totalAccounts);
      this.customerList.set(res.accounts);
    });
  }

  getDealerCode(dealerId: string): string {
    const dealer = this.dealerList().find(
      (dealer) => dealer.dealer_id === dealerId
    );
    console.log(this.dealerList);
    return dealer?.dealer_code?.toString() ?? 'N/A';
  }

  onDealerChange() {
    const selectedDealer = this.dealerList().find(
      (dealer) => dealer.dealer_id === this.customerObj.dealer_id
    );
    console.log('Selected Dealer:', selectedDealer);
    if (selectedDealer) {
      this.customerObj.dealer_code = selectedDealer.dealer_code;
    }
  }

  getAllDealer() {
    this.masterSrv.getAllDealer().subscribe(
      (res: DealerResponse) => {
        this.dealerList.set(res.dealer.rows);
        // this.totalDealer.set(res.dealer.count);
        console.log(res);
      },
      (error) => {
        // this.toastr.error(error, 'Error 123');
        // alert(error.message);
      }
    );
  }

  createCustomer() {
    this.customerObj.phone = Number(this.customerObj.phone);
    this.customerObj.mobile = Number(this.customerObj.mobile);
    this.masterSrv.createCustomer(this.customerObj).subscribe(
      (res: AccountsResponse) => {
        this.toastr.success('Account created successfully!', 'Success');
        this.displayAllCustomer();
        this.closeModal()
        // this.isModalVisible = false;
        // window.location.reload();
      },
      (error) => {
        this.toastr.error(error.message, 'Error');
      
      }
    );
  }

  selectedCustomerForDeletion: Accounts | null = null;

  selectCustomerForDeletion(accounts: Accounts) {
    this.selectedCustomerForDeletion = accounts;
    console.log(
      'Selected vehicle for deletion:',
      this.selectedCustomerForDeletion
    );
  }

  // deleteCustomerId(account_id: string) {
  //   alert('Are you sure you want to delete this customer?');
  //   this.masterSrv.deleteCustomer(account_id).subscribe(
  //     (res) => {
  //       this.toastr.success('Account Delete successfully!', 'Success');
  //       // alert('Delete successful');
  //       this.displayAllCustomer(); // Refresh the customer list
  //       this.closeModal();
  //       window.location.reload();
  //     },
  //     (error) => {
  //       console.error('Delete failed:', error); // Log the error for debugging
  //       alert('Failed to delete customer. Please try again.');
  //     }
  //   );
  // }

  deleteCustomerId() {
    if (
      this.selectedCustomerForDeletion &&
      this.selectedCustomerForDeletion.account_id
    ) { 
      this.masterSrv
        .deleteCustomer(this.selectedCustomerForDeletion.account_id)
        .subscribe(
          (res: AccountsResponse) => {
            this.displayAllCustomer();
            this.closeModal();
            window.location.reload();
          },
          (error) => {
            console.error('Delete vehicle error:', error);
            alert(error.message || 'Failed to delete vehicle');
          }
        );
    } else {
      alert('No vehicle selected for deletion');
    }
  }

  onUpdate() {
    this.displayAllCustomer();
    this.masterSrv.updateCustomer(this.customerObj).subscribe(
      (res: AccountsResponse) => {
        this.toastr.success('Account Update successfully!', 'Success');  
        this.displayAllCustomer();
        this.closeModal();
        // window.location.reload();
      },
      (error) => {
        this.toastr.error(error.message, 'Error');
        // alert('something happn ');
      }
    );
  }

  onEdit(data: Accounts) {
  
    this.useForm.patchValue({
      // account_type: data.account_type || '',
      fname: data.fname || '',
      lname: data.lname || '',
      dealer_code: data.dealer_code || '',
      email: data.email || '',
      // phone: data.phone || Number,
      // mobile: data.mobile || Number,
    });
    console.log(this.customerObj, 'trueeee----');
  }

  onSave(){
    if(this.useForm.invalid){
      console.log('form is invalid' , this.useForm);
      this.useForm.markAllAsTouched();
      return
    }

    this.createCustomer();
    ($('.bd-example-modal-lg') as any).modal('hide');
    console.log('form is valid')
  }
}
