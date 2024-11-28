 import { Accounts } from '../class/customer';
import { dealers } from '../class/dealers';
import { SingleDealer } from '../class/dealerSingle';
import { Events } from '../class/event';
import { Leads } from '../class/leads'; 
import { UserList } from '../class/multiuser';
import { Opportunities } from '../class/opportunities';
import { Tasks } from '../class/tasks';
import { Users } from '../class/users';
import { Vehicles } from '../class/vehicle';

 

export interface DealerResponse {
  dealer: {
    count: number;         
    rows: dealers[];        
  };
  ids: string[];
  leadsCounts: Lead[];
  opportunityCounts: opp[];
  taskCounts : task[];
  eventCounts: event[];
}

export interface VehicleRes{
  // {
  //   "dealer": {
  //       "count": 4,
  //       "rows": [
  //           {
  //          {
  //   "count": 21,
  //   "rows": [
  //       {


          
}


export interface VehicleResponse {
  count: number;
  rows: Vehicles[];
  totalVehicles: number;
  totalPages: number;
  currentPage: number;
  // vehicle: Vehicles[];
}

export interface Lead {
  dealer_id: string;
  count: number;
}

export interface opp {
  dealer_id: string;
  count: number;
}
export interface task {
  dealer_id: string;
  count: number;
}
export interface event {
  dealer_id: string;
  count: number;
}



export interface SingleDealerResponse { 
  dealer: SingleDealer;
  users: number;
  leads: number;
  opportunities : number;
  tasks: number;
  events: number;
}

export interface singleUserResponse{
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  users : UserList[];
}

export interface UserResponse extends Users {
  
}
 
export interface LeadResponse extends Leads {
   
}


export interface TaskResponse extends Tasks {
   
}

export interface EventResponse extends Events {
   
}

export interface OppResponse extends Opportunities {
   
}

export interface MultiuserResponse{
  totalCount: number;
  message: string;
  totalUsers: number ;
  totalPages: number;
  currentPage:number;
  users: UserList [];
}

export interface AccountsResponse{
  totalAccounts: number;
  totalPages: number;
  currentPage: number ;
  accounts: Accounts[];
}



export interface ProfileResponse{
  corporate_id: string
  name: string
  email: string
  role: string
  password: string
}

export interface  ForgotPasswordRequest {
  email: string; 
}


 
