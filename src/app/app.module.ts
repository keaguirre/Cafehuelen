import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoRoutingModule } from './pages/catalogo/catalogo-routing.module';
import { LoginAdminRoutingModule } from './pages/login-admin/login-admin-routing.module';
import { StartRoutingModule } from './pages/start/start-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginAdminRoutingModule,
    StartRoutingModule,
    CatalogoRoutingModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
