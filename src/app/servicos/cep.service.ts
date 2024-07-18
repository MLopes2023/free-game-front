import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  // Serviço Consulta cep api externa
  consultaCep(cep: string){
    return this.http.get<any>(`${environment.url_externa}/BuscaCep?idcep=${cep}`);
  }

}
