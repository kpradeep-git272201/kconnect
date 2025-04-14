import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'owner-dashbaord',
  //   loadComponent: () => import('./owner-dashbaord/owner-dashbaord.page').then( m => m.OwnerDashbaordPage),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'principal-dashbaord',
  //   loadComponent: () => import('./principal-dashbaord/principal-dashbaord.page').then( m => m.PrincipalDashbaordPage),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'student-profile',
    loadComponent: () => import('./student-profile/student-profile.page').then(m => m.StudentProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'change-pin',
    loadComponent: () => import('./change-pin/change-pin.page').then(m => m.ChangePinPage)
  },
  {
    path: 'school-profile',
    loadComponent: () => import('./school-profile/school-profile.page').then(m => m.SchoolProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then(m => m.AboutPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance',
    loadComponent: () => import('./attendance/attendance.page').then( m => m.AttendancePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'homework',
    loadComponent: () => import('./homework/homework.page').then( m => m.HomeworkPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'mark-attendance',
    loadComponent: () => import('./mark-attendance/mark-attendance.page').then( m => m.MarkAttendancePage),
    canActivate: [AuthGuard]
  },
  {

    path: 'attendance-logs',
    loadComponent: () => import('./attendance-logs/attendance-logs.page').then( m => m.AttendanceLogsPage),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
