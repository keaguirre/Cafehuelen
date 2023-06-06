import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { StartComponent } from './pages/start/start.component';
import { DetallePrepComponent } from './pages/login-admin/admin-home/detalle-prep/detalle-prep.component';
import { IngredientesComponent } from './pages/login-admin/admin-home/ingredientes/ingredientes.component';
import { PreparacionesComponent } from './pages/login-admin/admin-home/preparaciones/preparaciones.component';
import { AdminHomeComponent } from './pages/login-admin/admin-home/admin-home.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { ApiWatcherComponent } from './pages/api-watcher/api-watcher.component';
import { CategoriaComponent } from './pages/login-admin/admin-home/categoria/categoria.component';
import { GraficosAdminComponent } from './components/graficos-admin/graficos-admin.component';
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
    path: 'admin/categoria', component: CategoriaComponent,
  },
  {
    path: 'admin/ingredientes', component: IngredientesComponent,
  },
  {
    path: 'admin/preparaciones', component: PreparacionesComponent,
  },
  {
    path: 'admin/ingre-prep', component: DetallePrepComponent, 
  },
  {
    path: 'admin/detalle-prep', component: DetallePrepComponent,
  },
  {
    path: 'admin/compras', component: DetallePrepComponent, //Para pruebas de crud, simular y probar borrar una vez probado todo 
  },
  {
    path: 'admin/local', component: DetallePrepComponent, //Para pruebas de crud, simular y probar borrar una vez probado todo
  },
  {
    path: 'navbar', component: NavbarAdminComponent,
  },
  {
    path: 'api-watcher', component: ApiWatcherComponent,
  },
  {
    path: 'admin/analiticas', component: GraficosAdminComponent,
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
