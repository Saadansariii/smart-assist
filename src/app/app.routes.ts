 
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

export const routes: Routes = [ 
        { path:'', component:Login1Component, pathMatch: 'full'},
        {path:'login', component:Login1Component},
        // { path: 'Admin', component:OverviewComponent,canActivate: [AuthGuard], children: [ 
            { path: 'Admin', component:OverviewComponent,children: [    
          {path:'overview',component:OverviewComponent},
          {path:'dashboard',component:DashboardComponent},  
          {path:'dealer',component:DealerComponent}, 
          {path:'vehicle',component:VehicleComponent},  
          {path:'customer',component:CustomerComponent},  
          {path:'user',component:SingleDealerComponent} ,
          {path:'alert',component:AlertComponent} 
        ]}
      ]; 
