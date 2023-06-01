import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { StartComponent } from './pages/start/start.component';
import { IngrePrepComponent } from './pages/login-admin/ingre-prep/ingre-prep.component';
import { DetallePrepComponent } from './pages/login-admin/detalle-prep/detalle-prep.component';
import { IngredientesComponent } from './pages/login-admin/ingredientes/ingredientes.component';
import { PreparacionesComponent } from './pages/login-admin/preparaciones/preparaciones.component';
import { AdminHomeComponent } from './pages/login-admin/admin-home/admin-home.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { ApiWatcherComponent } from './pages/api-watcher/api-watcher.component';
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
    path: 'admin/home', component: AdminHomeComponent,
  },
  {
    path: '404', component: Error404Component,
  },
  {
    path: 'admin/ingredientes', component: IngredientesComponent,
  },
  {
    path: 'admin/preparaciones', component: PreparacionesComponent,
  },
  {
    path: 'admin/ingre-prep', component: IngrePrepComponent, 
  },
  {
    path: 'admin/detalle-prep', component: DetallePrepComponent,
  },
  {
    path: 'admin/compras', component: IngrePrepComponent, //Para pruebas de crud, simular y probar borrar una vez probado todo 
  },
  {
    path: 'admin/local', component: IngrePrepComponent, //Para pruebas de crud, simular y probar borrar una vez probado todo
  },
  {
    path: 'navbar', component: NavbarAdminComponent,
  },
  {
    path: 'api-watcher', component: ApiWatcherComponent,
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
