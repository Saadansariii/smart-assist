 
// import { SingleDealer } from '../class/dealerSingle';
// import { Users } from '../class/users';
import { dealers } from '../class/dealers';
import { Users } from '../class/users';
import { Vehicles } from '../class/vehicle';

export interface DealerResponse {
  totalDealers: number;
  totalPages: number;
  currentPage: number;
  dealers: dealers[];
}

export interface VehicleResponse {
  totalVehicles: number;
  totalPages: number;
  currentPage: number;
  vehicle: Vehicles[];
}

export interface SingleDealerResponse {
//   dealer: SingleDealer;
  users: number;
  leads: number;
}

export interface UserResponse extends Users {
   
}
