import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  // Serviço api da aplicação de autenticação do usuário
  login(form: any){
    return this.http.post<any>(`${environment.url_base}/AutenticacaoUsuario`,form)
  }

  // Serviço api da aplicação de registro do usuário
  cadastro(form: any){
    return this.http.post<any>(`${environment.url_base}/AdicionaUsuario`, form )
  }

  // Serviço api da aplicação de edição do registro do usuário
  editar(form: any){
    return this.http.put<any>(`${environment.url_base}/EditaUsuario`, form )
  }

  // Serviço api da aplicação de busca de informações de cadastro do usuário
  buscarId(id: any){
    return this.http.get<any>(`${environment.url_base}/BuscaUsuario?idusuario=${id}` )
  }
  
  // Serviço local de atualização boolean de usuário logado
  updateLoggedIn($boo: boolean): void {
    this.loggedIn.next($boo);
  }

  // Serviço local de usuário autenticado
  usuarioAutenticado() {
    const idUse = localStorage.getItem('idusuario') || ''
    if(idUse == ''){
      return false;
    }
    return this.loggedIn.value;
  }

}
