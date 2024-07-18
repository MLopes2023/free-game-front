import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NovoCadastroComponent } from './auth/novo-cadastro/novo-cadastro.component'; 

// const routes: Routes = [];

const routes: Routes = [
  { path: '', component: LoginComponent }, // Your other routes
  { path: 'login', component: LoginComponent },
  { path: 'novo-cadastro', component: NovoCadastroComponent },
  { path: 'dashboard/', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
