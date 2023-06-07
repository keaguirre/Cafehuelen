import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { StartComponent } from './pages/start/start.component';
import { CategoriaComponent } from './pages/administracion/categoria/categoria.component';
import { IngredientesComponent } from './pages/administracion/ingredientes/ingredientes.component';
import { PreparacionesComponent } from './pages/administracion/preparaciones/preparaciones.component';
import { DetallePrepComponent } from './pages/administracion/detalle-prep/detalle-prep.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { ApiWatcherComponent } from './pages/api-watcher/api-watcher.component';
import { GraficosAdminComponent } from './components/graficos-admin/graficos-admin.component';
import { HomeComponent } from './pages/administracion/home/home.component';
import { SessionGuard } from './guards/session.guard';
const routes: Routes = [

  {
    path: '', component:StartComponent,
    
  },
  {
    path: 'catalogo', component:CatalogoComponent,
  },
  {
    path: 'admin', component:LoginAdminComponent,
    //canActivate: [SessionGuard]
  },
  {
    path: 'admin/home', component: HomeComponent,
    //canActivate: [SessionGuard]
  },
  {
    path: '404', component: Error404Component,
  },
  {
    path: 'admin/categoria', component: CategoriaComponent,
    //canActivate: [SessionGuard]
  },
  {
    path: 'admin/ingredientes', component: IngredientesComponent,
    //canActivate: [SessionGuard]
  },
  {
    path: 'admin/preparaciones', component: PreparacionesComponent,
    //canActivate: [SessionGuard]
  },
  {
    path: 'admin/detalle-prep', component: DetallePrepComponent,
    //canActivate: [SessionGuard]
  },
  {
    path: 'admin/compras', component: DetallePrepComponent, //Para pruebas de crud, simular y probar borrar una vez probado todo 
    //canActivate: [SessionGuard]
  },
  {
    path: 'admin/local', component: DetallePrepComponent, //Para pruebas de crud, simular y probar borrar una vez probado todo
    //canActivate: [SessionGuard]
  },
  {
    path: 'navbar', component: NavbarAdminComponent,
  },
  {
    path: 'api-watcher', component: ApiWatcherComponent,
  },
  {
    path: 'admin/analiticas', component: GraficosAdminComponent,
    //canActivate: [SessionGuard]
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
