 
import { OverviewComponent } from './page/overview/overview.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { LoginComponent } from './page/login/login.component'; 
import { Routes } from '@angular/router';
import { DealerComponent } from './page/dealer/dealer.component';
import { VehicleComponent } from './page/vehicle/vehicle.component';
import { CustomerComponent } from './page/customer/customer.component';
import { SingleDealerComponent } from './page/single-dealer/single-dealer.component';
import { Login1Component } from './page/login-1/login-1.component';
import { AlertComponent } from './component/utils/alert/alert.component';
import { ProfileComponent } from './page/profile/profile.component';

export const routes: Routes = [ 
  { path: '', component: Login1Component, pathMatch: 'full' },
  { path: 'login', component: Login1Component },
  {
    path: 'Admin',
    component: OverviewComponent,
    // canActivate: [AuthGuard], // Uncomment if AuthGuard is needed
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'overview', component: OverviewComponent },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'dealer', component: DealerComponent, data: { title: 'Dealer' } },
      { path: 'vehicle', component: VehicleComponent, data: { title: 'Vehicle' } },
      { path: 'customer', component: CustomerComponent, data: { title: 'Customer' } },
      { path: 'user', component: SingleDealerComponent, data: { title: 'User' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
      { path: 'alert', component: AlertComponent }
    ]
  }
      ]; 
