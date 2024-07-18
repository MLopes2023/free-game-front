// dashboard-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { DashboardComponent } from './dashboard.component';
import { CatalogoComponent } from './catalogo/catalogo.component'; 
import { EditarUsuarioComponent } from './cadastros/editar-usuario/editar-usuario.component';
import { MinhaListaComponent } from './minha-lista/minha-lista.component';
import { DashBoardGuard } from '../guard/dashboard.guard';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [

      { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
      { path: 'catalogo' , component: CatalogoComponent },
      { path: 'minha-lista' , component: MinhaListaComponent },
      { path: 'editar-usuario/:id' , component: EditarUsuarioComponent },
    ], canActivate: [DashBoardGuard]  

  },
  
];


@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }