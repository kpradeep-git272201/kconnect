import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/owner-dashboard/owner-dashboard.page').then( m => m.OwnerDashboardPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'total-employee',
    loadComponent: () => import('./pages/total-employee/total-employee.page').then( m => m.TotalEmployeePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'present-employee',
    loadComponent: () => import('./pages/present-employee/present-employee.page').then( m => m.PresentEmployeePage),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
