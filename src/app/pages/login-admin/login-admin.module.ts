import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginAdminRoutingModule } from './login-admin-routing.module';
import { LoginAdminComponent } from './login-admin.component';
import { LoginService } from 'src/app/services/login.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { IngrePrepComponent } from './ingre-prep/ingre-prep.component';
import { PreparacionesComponent } from './preparaciones/preparaciones.component';


@NgModule({
  declarations: [LoginAdminComponent, AdminHomeComponent, IngredientesComponent, IngrePrepComponent, PreparacionesComponent, ], //Aqui se declaran los elementos que conocerá este módulo
  imports: [
    CommonModule,
    LoginAdminRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
  exports:[], //Aqui se exportan los módulos para que se hagan públicos
})
export class LoginAdminModule { }
