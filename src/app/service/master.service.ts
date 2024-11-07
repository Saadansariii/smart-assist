import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Distributors } from '../model/class/distributor';
import { Observable } from 'rxjs';
import {
  DealerResponse,
  SingleDealerResponse,
 
  UserResponse,
 
  VehicleResponse,
} from '../model/interface/master';
import { Vehicles } from '../model/class/vehicle';
import { dealers } from '../model/class/dealers';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'http://192.168.1.13:4090/api/superAdmin/';

  constructor(private http: HttpClient) {}

  // Dealer All

  getAllDealer(): Observable<DealerResponse> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    return this.http.get<DealerResponse>(this.apiUrl + 'dealers/all', {
      headers,
    });
  }

  getDealerById(id: string): Observable<SingleDealerResponse> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    return this.http.get<SingleDealerResponse>(`${this.apiUrl}dealers/${id}`, {
      headers,
    });
  }

  getAllUser(id: string): Observable<UserResponse[]> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    return this.http.get<UserResponse[]>(
      `${this.apiUrl}dealers/${id}/users/all`,
      {
        headers,
      }
    );
  }

  getAllLead(id: string): Observable<UserResponse[]> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    return this.http.get<UserResponse[]>(
      `${this.apiUrl}dealers/${id}/leads/all`,
      {
        headers,
      }
    );
  }
  
  // createDist(obj: Distributors): Observable<Distributors> {
  //   const token = sessionStorage.getItem('adminToken');
  //   const headers = new HttpHeaders()
  //     .set('authorization', `Bearer ${token}`)
  //     .set('accept', 'application/json');
  //   return this.http.post<Distributors>(
  //     this.apiUrl + 'distributors/create',
  //     obj
  //   );
  // }

  // dealers/create
  updateDealer(obj: dealers): Observable<dealers> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
      return this.http.put<dealers>(
        `${this.apiUrl}dealers/${obj.dealer_id}/update`,
        obj,
        {
          headers,
        }
      );
  }

  createDealer(obj: dealers): Observable<dealers> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
      return this.http.post<dealers>(
        this.apiUrl + 'dealers/create',
        obj,
        { headers }
      );
  }

  deleteDealer(id: string): Observable<any> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}dealers/${id}/delete`, {
      headers,
    });
  }

  // Vehicle API's

  getAllVehicle(): Observable<VehicleResponse> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    return this.http.get<VehicleResponse>(this.apiUrl + 'vehicles/all', {
      headers,
    });
  }

  createNewVehicle(obj: Vehicles): Observable<VehicleResponse> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    return this.http.post<VehicleResponse>(
      this.apiUrl + 'vehicles/create',
      obj,
      { headers }
    );
  }

  deleteVehicle(id: string): Observable<any> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    return this.http.delete<any>(`${this.apiUrl}vehicles/${id}/delete`, {
      headers,
    });
  }

  updateVehicle(obj: Vehicles): Observable<VehicleResponse> {
    const token = sessionStorage.getItem('adminToken');
    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
    return this.http.put<VehicleResponse>(
      `${this.apiUrl}vehicles/${obj.vehicle_id}/update`,
      obj,
      {
        headers,
      }
    );
  }


}
