 import { Accounts } from '../class/customer';
import { dealers } from '../class/dealers';
import { SingleDealer } from '../class/dealerSingle';
import { Leads } from '../class/leads'; 
import { UserList } from '../class/multiuser';
import { Users } from '../class/users';
import { Vehicles } from '../class/vehicle';

 

export interface DealerResponse {
  dealer: {
    count: number;         
    rows: dealers[];        
  };
  ids: string[];
  leads: Lead[];
}


export interface Lead {
  dealer_id: string;
  count: number;
}

export interface VehicleResponse {
  totalVehicles: number;
  totalPages: number;
  currentPage: number;
  vehicle: Vehicles[];
}

export interface SingleDealerResponse { 
  dealer: SingleDealer;
  users: number;
  leads: number;
}

export interface UserResponse extends Users {
   
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


 
