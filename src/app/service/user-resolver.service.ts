// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserResolverService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { MasterService } from './master.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {  UserResponse } from '../model/interface/master';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<UserResponse | null>  {
  constructor(private masterSrv: MasterService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserResponse | null> {
    const leadId = route.paramMap.get('id');
    if (leadId) {
      return this.masterSrv.userById(leadId); // Fetches dealer data by ID
    } else {
      return of(null); // Returns null if no ID is provided
    }
  }
}
