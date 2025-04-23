import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },

  {
    path: 'apps',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'owner',
    loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule), 
    canActivate: [AuthGuard]
  },
 

 








 



  // {
  //   path: '',
  //   redirectTo: 'sign-in', 
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  // },
  // {
  //   path: 'main',
  //   loadChildren : () => import('./main/main.module').then( m => m.MainModule)
  // },
  // {
  //   path: 'dashboard/:id',
  //   loadComponent: () =>
  //     import('./folder/folder.page').then(m => m.FolderPage),
  // },


];
