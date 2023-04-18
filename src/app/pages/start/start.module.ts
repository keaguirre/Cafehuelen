import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';
import { LoginAdminModule } from '../login-admin/login-admin.module';
import { CatalogoModule } from '../catalogo/catalogo.module';


@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    StartRoutingModule,
    CatalogoModule,
    LoginAdminModule
  ]
})
export class StartModule { }
