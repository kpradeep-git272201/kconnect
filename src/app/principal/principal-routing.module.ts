import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/principal-dashboard/principal-dashboard.page').then(
        (m) => m.PrincipalDashboardPage,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'total-employee',
    loadComponent: () =>
      import('./pages/total-employee/total-employee.page').then(
        (m) => m.TotalEmployeePage,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'mark-attendance-emp',
    loadComponent: () =>
      import('./pages/mark-attendance-emp/mark-attendance-emp.page').then(
        (m) => m.MarkAttendanceEmpPage,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'present-employee',
    loadComponent: () =>
      import('./pages/present-employee/present-employee.page').then(
        (m) => m.PresentEmployeePage,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'my-attendance',
    loadComponent: () =>
      import('./pages/my-attendance/my-attendance.page').then(
        (m) => m.MyAttendancePage,
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalRoutingModule {}
