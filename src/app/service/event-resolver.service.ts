// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EventResolverService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { MasterService } from './master.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EventResponse, LeadResponse } from '../model/interface/master';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<EventResponse | null>  {
  constructor(private masterSrv: MasterService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<EventResponse | null> {
    const leadId = route.paramMap.get('id');
    if (leadId) {
      return this.masterSrv.eventById(leadId); // Fetches dealer data by ID
    } else {
      return of(null); // Returns null if no ID is provided
    }
  }
}

