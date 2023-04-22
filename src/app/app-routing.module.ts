import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { StartComponent } from './pages/start/start.component';

const routes: Routes = [
 
  {
    path: '', component:StartComponent,
    
  },
  {
    path: 'catalogo', component:CatalogoComponent,
  },
  {
    path: 'admin', component:LoginAdminComponent,
    //anadir un guard para que si este logeado que pase a admin/ y si no a admin/login
  },
  {
    path: '404', component: Error404Component,
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
