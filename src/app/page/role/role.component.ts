import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'; 
import { Role } from '../../model/class/role';
import { roleResponse } from '../../model/interface/master';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
   private http = inject(HttpClient);
  useForm: FormGroup = new FormGroup({});
  roleList = signal<Role[]>([]); 
  count = signal<number>(0);

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
    this.masterSrv.getAllRole().subscribe({
      next : (res: roleResponse) => {
        this.count.set(res.count);
        this.roleList.set(res.rows);
      },
      error: (err) => {
        this.toastr.error(err.error.error , 'Error')
      },
    });
  }

  onSave() {
    this.masterSrv.createRole(this.useForm.value).subscribe({
      next: () => {
        this.loadRole();
        this.toastr.success('User created successfully!', 'Success');
      },
      error: (err) => {
        this.toastr.error(err.error.error , 'Error');
      },
    });
  }
}
