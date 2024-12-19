import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { createRole, role } from '../../model/interface/master';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule , CommonModule],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit{
  useForm: FormGroup = new FormGroup({});

  roleList : createRole [] = [];

  // service 
  private masterSrv = inject(MasterService);
  private readonly toastr = inject(ToastrService);

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadRole();
  }

  private initializeForm(): void {
    this.useForm = new FormGroup({
      role_name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  closeModal() {
    ($('.bd-example-modal-lg') as any).modal('hide');
  }

  openModals() {
    ($('.bd-example-modal-sm') as any).modal('show');
  }

  loadRole(){
    this.masterSrv.getAllRole().subscribe(
      (res:any) => {

      }
    )
  }

  onSave() {
    this.masterSrv.createRole(this.useForm.value).subscribe({
      next: () => {
        this.loadRole();
        this.toastr.success('User created successfully!', 'Success');
      },
      error: (err) => {
        this.toastr.error(
          err.message || err.error.error,
          'Creation Error'
        );
      },
    });
  }
}
