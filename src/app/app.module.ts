import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { StartComponent } from './pages/start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'; 
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiWatcherComponent } from './pages/api-watcher/api-watcher.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { TitleCasePipe } from '@angular/common';
import { NavbarClienteComponent } from './components/navbar-cliente/navbar-cliente.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoriaComponent } from './pages/administracion/categoria/categoria.component';
import { IngredientesComponent } from './pages/administracion/ingredientes/ingredientes.component';
import { PreparacionesComponent } from './pages/administracion/preparaciones/preparaciones.component';
import { DetallePrepComponent } from './pages/administracion/detalle-prep/detalle-prep.component';
import { ThousandsPipe } from './pipes/thousands.pipe';
import { HomeComponent } from './pages/administracion/home/home.component';
import { GraficosAdminComponent } from './components/graficos-admin/graficos-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarAdminComponent,
    CatalogoComponent, 
    StartComponent,
    LoginAdminComponent,
    DetallePrepComponent,
    ApiWatcherComponent,
    CarritoComponent,
    NavbarClienteComponent,
    MenuComponent,
    CategoriaComponent,
    IngredientesComponent,
    CategoriaComponent,
    PreparacionesComponent,
    HomeComponent,
    GraficosAdminComponent,
    ThousandsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [TitleCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
