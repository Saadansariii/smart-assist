import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeadResponse } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-lead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-lead.component.html',
  styleUrls: ['./single-lead.component.css'],
})
export class SingleLeadComponent implements OnInit {
  leadList = signal<LeadResponse | null>(null);  // WritableSignal to hold single LeadResponse
  masterSrv = inject(MasterService);
  leadData: LeadResponse | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Load the lead data from resolver or route parameter
    this.route.data.subscribe((data) => {
      this.leadData = data['leadData'];
      if (this.leadData) {
        this.singleLeadData(this.leadData.lead_id);
      } else {
        console.warn('Lead data not available from resolver.');
      }
    });

    // Handle any route params for leadId
    this.route.paramMap.subscribe((params) => {
      const leadId = params.get('leadId');
      if (leadId) {
        this.singleLeadData(leadId);
      } else if (!this.leadData) {
        console.error('Lead ID not found in the URL and no resolver data.');
      }
    });
  }

  // Fetch single lead data by ID
  singleLeadData(leadId: string): void {
    console.log('Fetching lead data for leadId:', leadId);
    this.masterSrv.leadById(leadId).subscribe({
      next: (res: LeadResponse) => {
        this.leadList.set(res);  // Set the single LeadResponse object to the signal
        console.log('Lead data fetched:', res);
      },
      error: (err: any) => {
        console.error('Error fetching lead data:', err);
      },
    });
  }
}
