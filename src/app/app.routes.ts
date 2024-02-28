import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapComponent } from './components/dashboard/map/map.component';
import { EnergyConsumptionComponent } from './components/dashboard/energy-consumption/energy-consumption.component';
import { EnergyBreakdownsComponent } from './components/dashboard/energy-breakdowns/energy-breakdowns.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'map', component: MapComponent },
      { path: 'energy-consumption', component: EnergyConsumptionComponent },
      { path: 'energy-breakdowns', component: EnergyBreakdownsComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
