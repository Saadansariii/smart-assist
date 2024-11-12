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
import {   FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    FormsModule ,MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,ReactiveFormsModule, CalendarModule
     
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent implements OnInit { 

  totalVehicle = signal<number>(0);
  vehicleList = signal<Vehicles[]>([]);
  masterSrv = inject(MasterService);
  vehicleObj: Vehicles = new Vehicles();

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
        };
  }

  closeModal() {
    this.isModalVisible = false;
  }

  // The users that will be displayed
  // Method to update the displayed users when the dropdown changes

  displayAllVehicle() {
    this.masterSrv.getAllVehicle().subscribe((res: VehicleResponse) => {
      this.totalVehicle.set(res.totalVehicles);
      this.vehicleList.set(res.vehicle);
    });
  }

  createVehicle() {
    this.masterSrv.createNewVehicle(this.vehicleObj).subscribe(
      (res: VehicleResponse) => {
        alert('new vehicle created');
        this.isModalVisible = false;
        this.displayAllVehicle();  
      },
      (error) => {
        alert('something was wrong');
      }
    );
  }

  deleteVehicleId(id: string) {
    alert('r u ok ');
    this.masterSrv.deleteVehicle(id).subscribe(
      (res) => {
        alert(res.message);
        this.displayAllVehicle();
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  onUpdate() {
    this.displayAllVehicle();
    this.masterSrv.updateVehicle(this.vehicleObj).subscribe(
      (res: VehicleResponse) => {
        alert('update successfully');
        this.isModalVisible = false;
        this.displayAllVehicle();
      },
      (error) => {
        alert('something happn ');
      }
    );
  }

  onEdit(data: Vehicles) {
    this.isModalVisible = true;
    this.vehicleObj = data;
    console.log(this.vehicleObj, 'trueeee----');
  }
}
