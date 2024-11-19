import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  OppResponse, TaskResponse } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-opp',
  standalone: true,
  imports: [],
  templateUrl: './single-opp.component.html',
  styleUrl: './single-opp.component.css'
})
export class SingleOppComponent implements OnInit{
  oppList = signal<OppResponse | null>(null);  // WritableSignal to hold single TaskResponse
  masterSrv = inject(MasterService);
  oppData: OppResponse | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Load the lead data from resolver or route parameter
    this.route.data.subscribe((data) => {
      this.oppData = data['oppData'];
      if (this.oppData) {
        this.singleoppData(this.oppData.opportunity_id);
      } else {
        console.warn('Lead data not available from resolver.');
      }
    });

    // Handle any route params for leadId
    this.route.paramMap.subscribe((params) => {
      const oppId = params.get('oppId');
      if (oppId) {
        this.singleoppData(oppId);
      } else if (!this.oppData) {
        console.error('Lead ID not found in the URL and no resolver data.');
      }
    });
  }

  // Fetch single lead data by ID
  singleoppData(oppId: string): void {
    console.log('Fetching lead data for leadId:', oppId);
    this.masterSrv.oppById(oppId).subscribe({
      next: (res: OppResponse) => {
        this.oppList.set(res);  // Set the single LeadResponse object to the signal
        console.log('Lead data fetched:', res);
      },
      error: (err: any) => {
        console.error('Error fetching lead data:', err);
      },
    });
  }
}
