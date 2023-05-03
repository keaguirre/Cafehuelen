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
import { TostadaComponent } from './components/tostada/tostada.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    NavbarAdminComponent,
    CatalogoComponent, 
    StartComponent,
    LoginAdminComponent,
    AdminHomeComponent,
    TostadaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
