import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { FormsModule } from '@angular/forms';
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

  formGroup: FormGroup | undefined;

  date: Date | undefined;

  ngOnInit(): void {
    this.displayAllVehicle();
  }

  isModalVisible = false;

  openModal(vehicle?: Vehicles) {
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
    this.isModalVisible = false;
  }

  // The users that will be displayed
  // Method to update the displayed users when the dropdown changes

  displayAllVehicle() {
    this.masterSrv.getAllVehicle().subscribe((res: VehicleResponse) => {
      this.count.set(res.count);
      // window.location.reload()
      this.vehicleList.set(res.rows);
    });
  }

  createVehicle() {
    this.masterSrv.createNewVehicle(this.vehicleObj).subscribe(
      (res: VehicleResponse) => {
        this.toastr.success('new vehicle created!', 'Success');
 
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

  onEdit(data: Vehicles) {
    this.isModalVisible = true;
    this.vehicleObj = data;
    console.log(this.vehicleObj, 'trueeee----');
  }
}
