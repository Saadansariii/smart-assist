 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes it available throughout your application
})

export class UserList {
  user_id: string
  account_id: string
  name: string
  email: string
  phone: number | null
  role: string
  password: string
  otp_validated: string
  otp: string
  otp_expiration: string
  dealer_code: number | null 
  corporate_id: string
  dealer_id: string 
   

  constructor(){ 
  this.user_id = '';
  this.account_id = '';
  this.name = '';
  this.phone = null;
  this.email = '';
  this.role = '';
  this.password = '';
  this.otp_validated = '';
  this.otp = '';
  this.otp_expiration = '';
  this.dealer_code = null; 
  this.corporate_id = '';
  this.dealer_id = '';

  }
}