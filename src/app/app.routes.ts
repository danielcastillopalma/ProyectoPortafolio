import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: './pages/tabs/home',  // Esto redirige a la página principal dentro de tabs
    pathMatch: 'full',
  },
  {
    path: 'tabs',  // Prefijo para las rutas dentro de las pestañas
    loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
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
    ],
  },

  // Páginas fuera de tabs
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then((m) => m.MenuPage),
  },
   {
        path: 'puntos',  // Ruta de puntos dentro de tabs
        loadComponent: () => import('./pages/puntos/puntos.page').then((m) => m.PuntosPage),
      },
      {
        path: 'recompensas',  // Ruta de recompensas dentro de tabs
        loadComponent: () => import('./pages/recompensas/recompensas.page').then((m) => m.RecompensasPage),
      },
      {
        path: 'acciones',  // Ruta de acciones dentro de tabs
        loadComponent: () => import('./pages/acciones/acciones.page').then((m) => m.AccionesPage),
      },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },

];

