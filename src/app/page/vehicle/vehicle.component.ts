import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { hostport, Alert, table, destroyTable } from '../../constant.component';

import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
// import { DataTablesModule } from "angular-datatables";
// import { Config } from 'datatables.net';
// import * as $ from 'jquery';
// import 'datatables.net';
// declare const $: any;

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, SharedModule, DataTablesModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent implements OnInit {
  // Define dtOptions without explicit typing

  displayedUsers: any;
  dtOptions: Config = {};
  ngOnInit(): void {
    this.abc();
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

  abc() {
    this.displayedUsers = [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: 61,
        startDate: '2011/04/25',
        salary: '$320,800',
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: 63,
        startDate: '2011/07/25',
        salary: '$170,750',
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: 66,
        startDate: '2009/01/12',
        salary: '$86,000',
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: 22,
        startDate: '2012/03/29',
        salary: '$433,060',
      },
      {
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: 33,
        startDate: '2008/11/28',
        salary: '$162,700',
      },
      {
        name: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        age: 61,
        startDate: '2012/12/02',
        salary: '$372,000',
      },
      {
        name: 'Herrod Chandler',
        position: 'Sales Assistant',
        office: 'San Francisco',
        age: 59,
        startDate: '2012/08/06',
        salary: '$137,500',
      },
      {
        name: 'Rhona Davidson',
        position: 'Integration Specialist',
        office: 'Tokyo',
        age: 55,
        startDate: '2010/10/14',
        salary: '$327,900',
      },
      {
        name: 'Colleen Hurst',
        position: 'Javascript Developer',
        office: 'San Francisco',
        age: 39,
        startDate: '2009/09/15',
        salary: '$205,500',
      },
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: 61,
        startDate: '2011/04/25',
        salary: '$320,800',
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: 63,
        startDate: '2011/07/25',
        salary: '$170,750',
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: 66,
        startDate: '2009/01/12',
        salary: '$86,000',
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: 22,
        startDate: '2012/03/29',
        salary: '$433,060',
      },
      {
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: 33,
        startDate: '2008/11/28',
        salary: '$162,700',
      },
      {
        name: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        age: 61,
        startDate: '2012/12/02',
        salary: '$372,000',
      },
      {
        name: 'Herrod Chandler',
        position: 'Sales Assistant',
        office: 'San Francisco',
        age: 59,
        startDate: '2012/08/06',
        salary: '$137,500',
      },
      {
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: 33,
        startDate: '2008/11/28',
        salary: '$162,700',
      },
      {
        name: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        age: 61,
        startDate: '2012/12/02',
        salary: '$372,000',
      },
      {
        name: 'Herrod Chandler',
        position: 'Sales Assistant',
        office: 'San Francisco',
        age: 59,
        startDate: '2012/08/06',
        salary: '$137,500',
      },
      {
        name: 'Rhona Davidson',
        position: 'Integration Specialist',
        office: 'Tokyo',
        age: 55,
        startDate: '2010/10/14',
        salary: '$327,900',
      },
      {
        name: 'Colleen Hurst',
        position: 'Javascript Developer',
        office: 'San Francisco',
        age: 39,
        startDate: '2009/09/15',
        salary: '$205,500',
      },
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: 61,
        startDate: '2011/04/25',
        salary: '$320,800',
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: 63,
        startDate: '2011/07/25',
        salary: '$170,750',
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: 66,
        startDate: '2009/01/12',
        salary: '$86,000',
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: 22,
        startDate: '2012/03/29',
        salary: '$433,060',
      },
      {
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: 33,
        startDate: '2008/11/28',
        salary: '$162,700',
      },
      {
        name: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        age: 61,
        startDate: '2012/12/02',
        salary: '$372,000',
      },

      {
        name: 'Sonya Frost',
        position: 'Software Engineer',
        office: 'Edinburgh',
        age: 23,
        startDate: '2008/12/13',
        salary: '$103,600',
      },
    ];
    // setTimeout(() => {
    //   $('#adminTable').DataTable().destroy();
    //   destroyTable();
    //   $('#adminTable').DataTable({
    //     dom: 'Bfrtip',
    //     scrollX: false,
    //     destroy: true,
    //     retrieve: true,
    //     filter: true,
    //     pagingType: 'full_numbers',
    //     pageLength: 10,
    //     lengthChange: true,
    //     processing: true,
    //     buttons: ['excel', 'print', 'pdf', 'csv'],
    //   });
    // }, 500);

    console.log('++++++++++++++++++++++');
  }

  // The users that will be displayed

  // Method to update the displayed users when the dropdown changes
  // updateDisplayedUsers() {
  //   this.displayedUsers = this.users;
  // }
}
