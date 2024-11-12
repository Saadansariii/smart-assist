import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import {
  CustomerResponse,
  DealerResponse,
  MultiuserResponse,
  ProfileResponse,
  SingleDealerResponse,
  UserResponse,
  VehicleResponse,
} from '../model/interface/master';
import { Vehicles } from '../model/class/vehicle';
import { dealers } from '../model/class/dealers';
import { UserList } from '../model/class/multiuser';
import { Customers } from '../model/class/customer';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'http://192.168.1.13:4090/api/superAdmin/';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.storageService.getItem('adminToken');
    return new HttpHeaders()
      .set('authorization', `Bearer ${token}`)
      .set('accept', 'application/json');
  }

  getAllDealer(): Observable<DealerResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<DealerResponse>(this.apiUrl + 'dealers/all', { headers });
  }

  getDealerById(id: string): Observable<SingleDealerResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<SingleDealerResponse>(`${this.apiUrl}dealers/${id}`, { headers });
  }

  getAllUser(id: string): Observable<UserResponse[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<UserResponse[]>(`${this.apiUrl}dealers/${id}/users/all`, { headers });
  }

  getAllLead(id: string): Observable<UserResponse[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<UserResponse[]>(`${this.apiUrl}dealers/${id}/leads/all`, { headers });
  }

  getAllOpportunities(id: string): Observable<UserResponse[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<UserResponse[]>(`${this.apiUrl}dealers/${id}/opportunities/all`, {
      headers,
    });
  }

  updateDealer(obj: dealers): Observable<dealers> {
    const headers = this.getAuthHeaders();
    return this.http.put<dealers>(`${this.apiUrl}dealers/${obj.dealer_id}/update`, obj, {
      headers,
    });
  }

  createDealer(obj: dealers): Observable<dealers> {
    const headers = this.getAuthHeaders();
    return this.http.post<dealers>(this.apiUrl + 'dealers/create', obj, { headers });
  }

  deleteDealer(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}dealers/${id}/delete`, { headers });
  }

  getAllVehicle(): Observable<VehicleResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<VehicleResponse>(this.apiUrl + 'vehicles/all', { headers });
  }

  createNewVehicle(obj: Vehicles): Observable<VehicleResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<VehicleResponse>(this.apiUrl + 'vehicles/create', obj, { headers });
  }

  deleteVehicle(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}vehicles/${id}/delete`, { headers });
  }

  updateVehicle(obj: Vehicles): Observable<VehicleResponse> {
    const headers = this.getAuthHeaders();
    return this.http.put<VehicleResponse>(
      `${this.apiUrl}vehicles/${obj.vehicle_id}/update`,
      obj,
      { headers }
    );
  }


  // Multiuser Page Api's

  getMultipleUser(): Observable<MultiuserResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<MultiuserResponse>(this.apiUrl + 'users/all', { headers });
  }

  createNewUser(obj: UserList): Observable<MultiuserResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<MultiuserResponse>(this.apiUrl + 'users/create', obj, { headers });
  }

  updateUser(obj: UserList): Observable<MultiuserResponse> {
    const headers = this.getAuthHeaders();
    return this.http.put<MultiuserResponse>(
      `${this.apiUrl}users/${obj.user_id}/update`,
      obj,
      { headers }
    );
  }

  deleteUser(id: string): Observable<MultiuserResponse> {
    const headers = this.getAuthHeaders();
    return this.http.delete<MultiuserResponse>(`${this.apiUrl}users/${id}/delete`, { headers });
  }



  // Customer API's

  getCustomer(): Observable<CustomerResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<CustomerResponse>(this.apiUrl + 'customers/all', { headers });
  }

  createCustomer(obj: Customers): Observable<CustomerResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<CustomerResponse>(this.apiUrl + 'customers/create', obj, { headers });
  }

  updateCustomer(obj: Customers): Observable<CustomerResponse> {
    const headers = this.getAuthHeaders();
    return this.http.put<CustomerResponse>(
      `${this.apiUrl}users/${obj.cust_id}/update`,
      obj,
      { headers }
    );
  }

  deleteCustomer(id: string): Observable<CustomerResponse> {
    const headers = this.getAuthHeaders();
    return this.http.delete<CustomerResponse>(`${this.apiUrl}users/${id}/delete`, { headers });
  }

  // Profile Page
  
  getProfileData(): Observable<ProfileResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<ProfileResponse>(this.apiUrl + 'show-profile', { headers });
  }

}
