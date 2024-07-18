import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CatalogoComponent } from './catalogo/catalogo.component'; 
import { EditarUsuarioComponent } from './cadastros/editar-usuario/editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MinhaListaComponent } from './minha-lista/minha-lista.component';
import { HeaderComponent } from '../component/header/header.component';
import { NgxMaskModule } from 'ngx-mask'; 

@NgModule({
  declarations: [
    CatalogoComponent,
    EditarUsuarioComponent,
    MinhaListaComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ]
})
export class DashboardModule { }
