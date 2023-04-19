import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './login-admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { IngrePrepComponent } from './ingre-prep/ingre-prep.component';
import { PreparacionesComponent } from './preparaciones/preparaciones.component';

const routes: Routes = [
  {
    path:'login', component: LoginAdminComponent
  },
  {
    path:'', component: AdminHomeComponent
  },
  {
    path:'ingredientes', component: IngredientesComponent,
    title: 'Panel ingredientes'
  },
  {
    path:'ingre-prep', component: IngrePrepComponent,
    title:'Panel recetas'
  },
  {
    path:'preparaciones', component: PreparacionesComponent,
    title:'Panel preparaciones'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginAdminRoutingModule { }