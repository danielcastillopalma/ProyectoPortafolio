import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tabs',  // Prefijo para las rutas dentro de las pestañas
    loadComponent: () => import('./components/tabs/tabs.component').then((m) => m.TabsComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'mapa',
        loadComponent: () => import('./pages/mapa/mapa.page').then((m) => m.MapaPage),
      },
      {
        path: 'camara',
        loadComponent: () => import('./pages/camara/camara.page').then((m) => m.CamaraPage),
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/blog/blog.page').then((m) => m.BlogPage),
      },
      {
        path: 'rewards',
        loadComponent: () => import('./pages/rewards/rewards.page').then((m) => m.RewardsPage),
      },
      {
        path: 'ranking',
        loadComponent: () => import('./pages/ranking/ranking.page').then((m) => m.RankingPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: 'rewards',
    loadComponent: () => import('./pages/rewards/rewards.page').then(m => m.RewardsPage)
  },
  {
    path: 'ranking',
    loadComponent: () => import('./pages/ranking/ranking.page').then(m => m.RankingPage)
  }

];

