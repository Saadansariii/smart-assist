 
// import { SingleDealer } from '../class/dealerSingle';
// import { Users } from '../class/users';
import { dealers } from '../class/dealers';
import { SingleDealer } from '../class/dealerSingle';
import { Leads } from '../class/leads';
import { Users } from '../class/users';
import { Vehicles } from '../class/vehicle';

 

export interface DealerResponse {
  dealer: {
    count: number;          // Total dealers count
    rows: dealers[];        // Array of dealer objects
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

 
