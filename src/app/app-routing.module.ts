import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then ( m => m.CatalogoModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-admin/login-admin.module').then ( m => m.LoginAdminModule),
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then ( m => m.StartModule),
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
