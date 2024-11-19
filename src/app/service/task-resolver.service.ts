// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskResolverService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { MasterService } from './master.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LeadResponse, TaskResponse } from '../model/interface/master';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskResolver implements Resolve<TaskResponse | null>  {
  constructor(private masterSrv: MasterService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TaskResponse | null> {
    const leadId = route.paramMap.get('id');
    if (leadId) {
      return this.masterSrv.taskById(leadId); // Fetches dealer data by ID
    } else {
      return of(null); // Returns null if no ID is provided
    }
  }
}