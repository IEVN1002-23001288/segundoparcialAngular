import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Formularios',
    children: [
      { path: 'usuario', loadComponent: () => import('./Formularios/usuario/usuario').then(c => c.Usuario) },
      { path: 'zodiaco', loadComponent: () => import('./Formularios/zodiaco/zodiaco').then(c => c.Zodiaco) }
    ]
  },
  {
    path: 'Escuela',
    children: [
      { path: 'listaAlumnos', loadComponent: () => import('./Escuela/lista-alumnos/lista-alumnos').then(c => c.ListaAlumnos) },
      { path: 'cinepolis', loadComponent: () => import('./Escuela/cinepolis/cinepolis').then(c => c.Cinepolis) },
      { path: 'ver-registros', loadComponent: () => import('./Escuela/ver-registros/ver-registros').then(c => c.VerRegistros) }
    ]
  },
  {
    path: 'utl',
    children: [
      {
        path: 'alumnos',
        children: [
          { path: '', pathMatch: 'full', loadComponent: () => import('./utl/alumnos/alumnos').then(c => c.alumnos) },
          { path: 'agregar', loadComponent: () => import('./utl/alumnos/agregar/agregar').then(c => c.Agregar) },
          { path: 'editar/:matricula', loadComponent: () => import('./utl/alumnos/editar/editar').then(c => c.Editar) },
          { path: 'eliminar/:matricula', loadComponent: () => import('./utl/alumnos/eliminar/eliminar').then(c => c.Eliminar) }
        ]
      },
      {
        path: 'maestros',
        children: [
          { path: '', pathMatch: 'full', loadComponent: () => import('./utl/maestros/maestros').then(c => c.Maestros) },
          { path: 'agregar', loadComponent: () => import('./utl/maestros/agregar/agregar').then(c => c.Agregar) },
          { path: 'editar/:matricula', loadComponent: () => import('./utl/maestros/editar/editar').then(c => c.Editar) },
          { path: 'eliminar/:matricula', loadComponent: () => import('./utl/maestros/eliminar/eliminar').then(c => c.Eliminar) }
        ]
      }
    ]
  },
  { path: '', redirectTo: 'utl/alumnos', pathMatch: 'full' },
  { path: '**', redirectTo: 'utl/alumnos' }
];
