import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { VehicleResponse } from '../../model/interface/master';
import { Vehicles } from '../../model/class/vehicle';
import { MasterService } from '../../service/master.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ToastrService } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import $ from 'jquery';
import { userInfo } from 'os';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CalendarModule,
    SweetAlert2Module,
    NgbModalModule,
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent implements OnInit {
  count = signal<number>(0);

  vehicleList = signal<Vehicles[]>([]);
  masterSrv = inject(MasterService);
  vehicleObj: Vehicles = new Vehicles();
  private readonly toastr = inject(ToastrService);
  dtOptions: Config = {};
  items: any;
  // currentMode : 'add' | 'delete' = 'add'
  formGroup: FormGroup | undefined;

  date: Date | undefined;

  ngOnInit(): void {
    this.displayAllVehicle();
 
  }

  isModalVisible = false;

  useForm: FormGroup;

  constructor(private modalService: NgbModal) {
    this.useForm = new FormGroup({
      vehicle_name: new FormControl(this.vehicleObj.vehicle_name, [
        Validators.required,
        Validators.minLength(2),
      ]),
      VIN: new FormControl(this.vehicleObj.VIN, [
        Validators.required,
        Validators.minLength(5),
      ]),
      type: new FormControl(this.vehicleObj.type , [
        Validators.required
      ]),
      YOM: new FormControl(this.vehicleObj.YOM , [
        Validators.required
      ])
    });
  }

  openModal(vehicle?: Vehicles) {
      this.useForm.reset();
    this.isModalVisible = true;
    this.vehicleObj = vehicle
      ? { ...vehicle }
      : {
          YOM: new Date(),
          vehicle_name: '',
          type: '',
          VIN: '',
          vehicle_id: '',
          created_at: '',
          updated_at: '',
          corporate_id: '',
          deleted: false,
        };
  }

  // trackByIndex(index: number, vehicle: any): number {
  //   return vehicle.vehicle_id; // Use a unique identifier
  // }

  closeModal() {
    ($('#exampleModalCenter') as any).modal('hide');
    this.isModalVisible = false;
  }

  // The users that will be displayed
  // Method to update the displayed users when the dropdown changes

  displayAllVehicle() {
    this.masterSrv.getAllVehicle().subscribe((res: VehicleResponse) => {
      this.count.set(res.count);
      this.vehicleList.set(res.rows);
    });
  }

  onSave() {
    if (this.useForm.invalid) {
      console.log('Form is invalid', this.useForm);
      this.useForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return; // If form is invalid, do not proceed
    }

    // If form is valid, call the API to create the vehicle
    this.createVehicle();
    ($('#exampleModalCenter') as any).modal('hide');
    console.log('Form is valid. Proceeding with API call.');
  }

  createVehicle() {
    console.log('Creating vehicle with the following data:', this.vehicleObj);
    // this.isEditMode = true;
    this.masterSrv.createNewVehicle(this.vehicleObj).subscribe(
      (res: VehicleResponse) => {
        this.toastr.success('new vehicle created!', 'Success');
        this.closeModal();
        this.displayAllVehicle();
      },
      (error) => {
        console.error('something was wrong:', error);
      }
    );
  }

  selectedVehicleForDeletion: Vehicles | null = null;

  selectVehicleForDeletion(vehicle: Vehicles) {
    this.selectedVehicleForDeletion = vehicle;
  }

  deleteVehicleId() {
    if (
      this.selectedVehicleForDeletion &&
      this.selectedVehicleForDeletion.vehicle_id
    ) {
      this.masterSrv
        .deleteVehicle(this.selectedVehicleForDeletion.vehicle_id)
        .subscribe(
          (res: VehicleResponse) => {
            this.displayAllVehicle();
          },
          (error) => {
            alert(error.message || 'Failed to delete vehicle');
          }
        );
    } else {
      alert('No vehicle selected for deletion');
    }
  }

  onUpdate() {
    // this.isEditMode = false;
    this.displayAllVehicle();
    this.masterSrv.updateVehicle(this.vehicleObj).subscribe(
      (res: VehicleResponse) => {
        this.toastr.success('update successfully!', 'Success');
        this.displayAllVehicle();
      },
      (error) => {
        console.error(error.message, 'error');
      }
    );
  }

  // onEdit(data: Vehicles) {
  //   this.isEditMode = false;
  //   this.isModalVisible = true;
  //   this.vehicleObj = data;
  //   console.log(this.vehicleObj, 'trueeee----');
  // }

  onEdit(data: Vehicles) {
    // this.isEditMode = false;
    this.isModalVisible = true;
    this.vehicleObj = data;

    this.useForm.patchValue({
      vehicle_id: data.vehicle_id || '',
      vehicle_name: data.vehicle_name || '',
      YOM: data.YOM || new Date(),
      type: data.type || '',
      VIN: data.VIN || '',
    });

    console.log(this.vehicleObj, 'trueeee----');
  }
}
