 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes it available throughout your application
})

export class UserList {
  user_id: string
  account_id: string
  name: string
  email: string
  phone: string
  role: string
  password: string
  otp_validated: boolean
  otp: any
  otp_expiration: any
  dealer_code: string
  created_at: string
  updated_at: string
  corporate_id: string
  dealer_id: string

  constructor(){

  this.user_id = '';
  this.account_id = '';
  this.name = '';
  this.email = '';
  this.phone = '';
  this.role = '';
  this.password = '';
  this.otp_validated = false;
  this.otp = '';
  this.otp_expiration = '';
  this.dealer_code = '';
  this.created_at = '';
  this.updated_at = '';
  this.corporate_id = '';
  this.dealer_id = '';

  }
}