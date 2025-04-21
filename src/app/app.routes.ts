import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'qrlab',
    loadComponent: () => import('./pages/qrlab/qrlab.page').then( m => m.QrlabPage)
  },
];
