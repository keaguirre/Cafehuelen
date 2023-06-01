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
import { AdminHomeComponent } from './pages/login-admin/admin-home/admin-home.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'; 
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetallePrepComponent } from './pages/login-admin/detalle-prep/detalle-prep.component';
import { ApiWatcherComponent } from './pages/api-watcher/api-watcher.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { TitleCasePipe } from '@angular/common';
import { NavbarClienteComponent } from './components/navbar-cliente/navbar-cliente.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarAdminComponent,
    CatalogoComponent, 
    StartComponent,
    LoginAdminComponent,
    AdminHomeComponent,
    DetallePrepComponent,
    ApiWatcherComponent,
    CarritoComponent,
    NavbarClienteComponent,
    MenuComponent,
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
