import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileResponse } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  masterSrv = inject(MasterService);
  profileList = signal<ProfileResponse[]>([]);
  ngOnInit(): void {
    // this.fetchDealerData();
    this.getProfileData();

  }

  getProfileData(){
    this.masterSrv.getProfileData().subscribe(
      (res: ProfileResponse) => { 
      },
      (error) => {
        alert(error.message);
      }
    );
  }
}
