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

  login(form: any){

    // {
    //   "emailpwd": "mlsilva.lopes@gmail.com",
    //   "senhapwd": "12345"
    // }
    // let query: string = `emailpwd=${form.value.email}&senhapwd=${form.value.password}` 
    return this.http.post<any>(`${environment.url_base}/AutenticacaoUsuario`,form)
  }

  cadastro(form: any){
    return this.http.post<any>(`${environment.url_base}/AdicionaUsuario`, form )
  }


  editar(form: any){
    return this.http.put<any>(`${environment.url_base}/EditaUsuario`, form )
  }

  buscarId(id: any){
    return this.http.get<any>(`${environment.url_base}/BuscaUsuario?idusuario=${id}` )
  }
  
  updateLoggedIn($boo: boolean): void {
    this.loggedIn.next($boo);
  }

  usuarioAutenticado() {
    const idUse = localStorage.getItem('idusuario') || ''
    if(idUse == ''){
      return false;
    }
    return this.loggedIn.value;
  }

}
