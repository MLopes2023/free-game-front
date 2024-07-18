import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs'; 
import { AutenticacaoService } from '../servicos/autenticacao.service';


@Injectable({
  providedIn: 'root',
})

export class DashBoardGuard implements CanActivate {

  constructor(
    private authService: AutenticacaoService, 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> |boolean {

    if(this.authService.usuarioAutenticado()){
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;

  }
}