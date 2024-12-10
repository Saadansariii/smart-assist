import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DealerResponse,
  MultiuserResponse,
  UserResponse,
} from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { UserList } from '../../model/class/multiuser';
import { dealers } from '../../model/class/dealers';
import { ToastrService } from 'ngx-toastr';
import { AleartSrvService } from '../../service/aleart-srv.service';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Accounts } from '../../model/class/customer';
import { Users } from '../../model/class/users';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TooltipModule,
    FloatLabelModule,
    ReactiveFormsModule,
    NgbModalModule,
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
  useForm: FormGroup  = new FormGroup({});
  previousValue: string = '';

  constructor(
    private aleartsrv: AleartSrvService,
    private modalService: NgbModalModule
  ) { 
    this.initializeform();
  }

  initializeform(){
    this.useForm = new FormGroup({
      name: new FormControl(this.userObj.name, [Validators.required]),
      role: new FormControl(this.userObj.role, [Validators.required]),
      email: new FormControl(this.userObj.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.userObj.phone, [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      account_id: new FormControl(this.userObj.account_id, [
        Validators.required,
        Validators.minLength(12),
      ]),
      dealer_code: new FormControl(this.userObj.dealer_id, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  private readonly toastr = inject(ToastrService);

  ngOnInit() {
    this.displayAllUser();
    this.getAllDealer();
  }

  onPhoneInputChange(value: string) {
    this.userObj.phone = Number(value);
  }

  openModal(user?: UserList) {
    if (user) {
      // Use the form control to patch values
      const selectedDealer = this.dealerList().find(
        (dealer) => dealer.dealer_id === user.dealer_id
      );

      this.useForm.patchValue({
        name: user.name || '',
        account_id: user.account_id || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        dealer_code: selectedDealer ? selectedDealer.dealer_id : '', // Bind dealer_code correctly using form
      });
    } else {
      // Reset the form for a new user
      this.useForm.reset();
    }
  }

  closeModal() {
    ($('.bd-example-modal-lg') as any).modal('hide');
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
        this.toastr.error(error, 'Server Error');
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

  // onDealerChange() {
  //   const selectedDealer = this.dealerList().find(
  //     (dealer) => dealer.dealer_id === this.userObj.dealer_id
  //   );
  //   console.log('Selected Dealer:', selectedDealer);
  //   if (selectedDealer) {
  //     this.userObj.dealer_code = selectedDealer.dealer_code;
  //   }
  // }

  onDealerChange() {
    // Update userObj when a dealer is selected
    const selectedDealerId = this.useForm.get('dealer_code')?.value;
    const selectedDealer = this.dealerList().find(
      (dealer) => dealer.dealer_id === selectedDealerId
    );

    if (selectedDealer) {
      this.userObj.dealer_id = selectedDealer.dealer_id;
      this.userObj.dealer_code = selectedDealer.dealer_code;
    }

    console.log('Selected Dealer:', selectedDealer);
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
    // if (
    //   !this.userObj.phone ||
    //   isNaN(this.userObj.phone) ||
    //   this.userObj.phone <= 0
    // ) {
    //   alert('Please enter a valid phone number!');
    //   return;
    // }

    // if (!this.userObj.dealer_id) {
    //   alert('Please select a dealer!');
    //   return;
    // }

    this.masterSrv.createNewUser(this.useForm.value).subscribe({
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
    this.masterSrv.updateUser(this.useForm.value).subscribe({
      next: () => {
        this.toastr.success('User updated Successfully!', 'Success');
        this.displayAllUser();
        this.closeModal();
      },
      error: (err) => {
        this.toastr.error(err, 'Server Error');
      },
    });
  }

   

  onSave() {
    if (this.useForm.invalid) {
      console.log('form is invalid', this.useForm);
      this.useForm.markAllAsTouched();
      return;
    }

    this.createUser();
    console.log('form is valid');
  }

  onEdit(id : string) { 
    this.masterSrv.getSingleUser(id).subscribe((res:UserList)=>{ 
      this.userObj = res;
      console.log('this is onedit ' , this.userObj)
      this.openModal();
      this.initializeform();
    },error=>{
      alert('API error')
    })
  }

  // this is for email require
  isEmailChange(): boolean {
    return this.useForm.value.email !== this.previousValue;
  }
}
