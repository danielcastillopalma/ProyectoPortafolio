import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',  // Esto redirige a la página principal dentro de tabs
    pathMatch: 'full',
  },
  {
    path: 'tabs',  // Prefijo para las rutas dentro de las pestañas
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'mapa',
        loadComponent: () => import('./mapa/mapa.page').then((m) => m.MapaPage),
      },
      {
        path: 'camara',
        loadComponent: () => import('./camara/camara.page').then((m) => m.CamaraPage),
      },
      {
        path: 'blog',
        loadComponent: () => import('./blog/blog.page').then((m) => m.BlogPage),
      },
    ],
  },

  // Páginas fuera de tabs
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then((m) => m.MenuPage),
  },
   {
        path: 'puntos',  // Ruta de puntos dentro de tabs
        loadComponent: () => import('./puntos/puntos.page').then((m) => m.PuntosPage),
      },
      {
        path: 'recompensas',  // Ruta de recompensas dentro de tabs
        loadComponent: () => import('./recompensas/recompensas.page').then((m) => m.RecompensasPage),
      },
      {
        path: 'acciones',  // Ruta de acciones dentro de tabs
        loadComponent: () => import('./acciones/acciones.page').then((m) => m.AccionesPage),
      },
];


