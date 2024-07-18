import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/servicos/game.server';
import { GameUsuarioService } from 'src/app/servicos/game.usuario.server';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  idUsuario: any = localStorage.getItem('idusuario');
  nameBuscar: string = '';
  listaGames: any[] = [];
  isLoading: boolean = false;
  selectedGame: any = null;
  observacao:string ='';

  constructor(private gamesHttp: GameService,
    private gamesUsuarioHttp: GameUsuarioService
  ) { }

  ngOnInit(): void { 
    //atualizar catálogos
    this.atualizar('');
  }

  //atualizar lista de catálogos
  atualizar(searchTerm: string){
    this.gamesHttp.listaGames(searchTerm).subscribe(
      (resp: any)=>{
        this.listaGames = resp.FreeTogames;
    },(er:any)=>{
      alert(er.error.mesage)
    });
    
  }
   
  // open c para adicionar game à lista de usuário
  openModal(game: any) {
    this.selectedGame = game;
    const modal = document.getElementById('gameModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // fechar formulário modal
  closeModal() {
    this.selectedGame = null;
    const modal = document.getElementById('gameModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // adicionar game a lista de favoritos do usuário
  adicionarFavoritos(){

    this.gamesUsuarioHttp.adicionarMinhaLista(this.selectedGame.idgame,this.observacao).subscribe( (resp: any)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Adicionado a lista com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
      this.observacao = '';
      this.closeModal();
    }, (erro: any)=>{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: erro.error.mesage,
        showConfirmButton: false,
        timer: 1500
      });
      this.observacao = '';
      this.closeModal();
    })

     
  }

}
