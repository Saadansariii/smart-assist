import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import {
  AccountsResponse, 
  DealerResponse,
  EventResponse,
  LeadResponse,
  MultiuserResponse,
  OppResponse,
  ProfileResponse,
  SingleDealerResponse,
  TaskResponse,
  UserResponse,
  VehicleResponse,
} from '../model/interface/master';
import { Vehicles } from '../model/class/vehicle';
import { dealers } from '../model/class/dealers';
import { UserList } from '../model/class/multiuser'; 
import { Accounts } from '../model/class/customer';
import { Leads } from '../model/class/leads';
import { Tasks } from '../model/class/tasks';
import { Events } from '../model/class/event';
import { Opportunities } from '../model/class/opportunities';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  
  apiUrl: string = 'https://api.smartassistapp.in/api/superAdmin/';

  constructor(private http: HttpClient, private storageService: StorageService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.storageService.getItem('token');
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

  getAllLead(id: string): Observable<LeadResponse[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<LeadResponse[]>(`${this.apiUrl}dealers/${id}/leads/all`, { headers });
  }

  getAllTask(id: string): Observable<TaskResponse[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<TaskResponse[]>(`${this.apiUrl}dealers/${id}/tasks/all`, { headers });
  }

  getEventsAll(id: string): Observable<EventResponse[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<EventResponse[]>(`${this.apiUrl}dealers/${id}/events/all`, { headers });
  }

  getAllOpportunities(id: string): Observable<OppResponse[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<OppResponse[]>(`${this.apiUrl}dealers/${id}/opportunities/all`, {
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
 

  // single By Id 

  eventById(id: string): Observable<EventResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<EventResponse>(`${this.apiUrl}events/${id}`, { headers });
  }


  leadById(id: string): Observable<LeadResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<LeadResponse>(`${this.apiUrl}leads/${id}`, { headers });
  }

  userById(id: string): Observable<UserResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<UserResponse>(`${this.apiUrl}users/${id}`, { headers });
  }

  oppById(id: string): Observable<OppResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<OppResponse>(`${this.apiUrl}opportunities/${id}`, { headers });
  }

  taskById(id: string): Observable<TaskResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<TaskResponse>(`${this.apiUrl}tasks/${id}`, { headers });
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

  getCustomer(): Observable<AccountsResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<AccountsResponse>(this.apiUrl + 'accounts/all', { headers });
  }

  createCustomer(obj: Accounts): Observable<AccountsResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<AccountsResponse>(this.apiUrl + 'accounts/create', obj, { headers });
  }

  updateCustomer(obj: Accounts): Observable<AccountsResponse> {
    const headers = this.getAuthHeaders();
    return this.http.put<AccountsResponse>(
      `${this.apiUrl}accounts/${obj.account_id}/update`,
      obj,
      { headers }
    );
  }
  // 

  deleteCustomer(account_id: string): Observable<AccountsResponse> {
    const headers = this.getAuthHeaders();
    return this.http.delete<AccountsResponse>(`${this.apiUrl}accounts/${account_id}/delete`, { headers });
  }

  // Profile Page
  
  getProfileData(): Observable<ProfileResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<ProfileResponse>(this.apiUrl + 'show-profile', { headers });
  }

}
