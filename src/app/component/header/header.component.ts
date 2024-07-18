import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  idUsuario: any = localStorage.getItem('idusuario');
  @Input() nameBuscar!: string;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router){

  }
  handleSearch() {
    this.search.emit(this.nameBuscar);
  }

  sair(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
