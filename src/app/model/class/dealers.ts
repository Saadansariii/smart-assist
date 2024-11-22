import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes it available throughout your application
})
export class dealers {
  dealer_id: string;
  dealer_name: string;
  dealer_code: number | null;
  created_at: string;
  updated_at: string;
  corporate_id: string;

  constructor() {
    this.dealer_id = '';
    this.dealer_name = '';
    this.dealer_code = null
    this.created_at = '';
    this.updated_at = '';
    this.corporate_id = '';
  }
}
