import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GameUsuarioService {

  constructor(private http: HttpClient) { }

  buscaGameUsuario(idgame: any){
    const idusuario = localStorage.getItem('idusuario');
    return this.http.get<any>(`${environment.url_base}/BuscaGameLista?idusuariogame=${idusuario}?idgame=${idgame}`);
  }

  listaGamesUsuario(name: string){
    
    var like = '';
    if(name != ''){
      like = `?liketitulo=${name}`
    }
    const idusuario = localStorage.getItem('idusuario');
    return this.http.get<any>(`${environment.url_base}/BuscaGamesLista?idusuariogame=${idusuario}${like}`);
  }

    
  adicionarMinhaLista(idgame: any, observacao: any ){
    const body = {
      "idgame": idgame,
      "idusuariogame": localStorage.getItem('idusuario'),
      "observacao": observacao   
    }
      
    return this.http.post<any>(`${environment.url_base}/AdicionaGameLista`,body);
  }

  editarMinhaLista(idgame: any, observacao: any ){
    const body = {
      "idgame": idgame,
      "idusuariogame": localStorage.getItem('idusuario'),
      "observacao": observacao   
    }
      
    return this.http.put<any>(`${environment.url_base}/EditaGameLista`,body);
  }


  removerGame(idgame: any){
    const idusuariogame = localStorage.getItem('idusuario');
    return this.http.delete<any>(`${environment.url_base}/RemoveGameLista?idusuariogame=${idusuariogame}&idgame=${idgame}`)
  }
}
