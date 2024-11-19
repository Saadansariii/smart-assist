// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class OpportunitiesResolverService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { MasterService } from './master.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LeadResponse, OppResponse } from '../model/interface/master';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpportunitiesResolver implements Resolve<OppResponse | null>  {
  constructor(private masterSrv: MasterService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<OppResponse | null> {
    const leadId = route.paramMap.get('id');
    if (leadId) {
      return this.masterSrv.oppById(leadId); // Fetches dealer data by ID
    } else {
      return of(null); // Returns null if no ID is provided
    }
  }
}

