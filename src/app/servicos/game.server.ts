import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  // Serviços de Consulta game(s) da api externa  
  listaGames(name: string){
    
    var like = '';

    if(name != ''){
      like = `?liketitulo=${name}`
    }

    return this.http.get<any>(`${environment.url_externa}/BuscaFreeToGameLista${like}`);
  }

  game(id: any){
    return this.http.get<any>(`${environment.url_externa}/BuscaFreeToGame?idgame=${id}`);
  }



}
