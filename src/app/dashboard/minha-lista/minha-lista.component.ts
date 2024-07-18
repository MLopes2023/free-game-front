import { Component, OnInit } from '@angular/core';
// import { GameService } from 'src/app/servicos/game.server';
import { GameUsuarioService } from 'src/app/servicos/game.usuario.server';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-minha-lista',
  templateUrl: './minha-lista.component.html',
  styleUrls: ['./minha-lista.component.css']
})
export class MinhaListaComponent implements OnInit {
  idUsuario: any = localStorage.getItem('idusuario');
  nameBuscar: string = '';
  listaGames: any[] = [];
  isLoading: boolean = false;
  selectedGame: any = null;
  observacao:string ='';

  constructor(private gamesUsuarioHttp: GameUsuarioService) { }

  ngOnInit(): void { 
    this.atualizar('');
  }

  // Listar todos os games do usuário  
  atualizar(searchTerm: string){
    this.gamesUsuarioHttp.listaGamesUsuario(searchTerm).subscribe(
      (resp: any)=>{
        this.listaGames = resp.freetogames;
    });
  }

  editarMinhaLista(){

    this.gamesUsuarioHttp.editarMinhaLista(
     this.selectedGame.idgame,
     this.observacao ).subscribe((resp: any)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Game editado com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
      this.closeModal();
      this.atualizar('');
     }, (erro: any)=>{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: erro.error.mesage,
        showConfirmButton: false,
        timer: 1500
      });
      this.closeModal();
      this.atualizar('');
    });
    
  }

  removerMinhaLista(){
    this.gamesUsuarioHttp.removerGame( this.selectedGame.idgame ).subscribe((resp: any)=>{
       Swal.fire({
         position: "top-end",
         icon: "success",
         title: resp.mesage,
         showConfirmButton: false,
         timer: 1500
       });

       this.closeModal();
       this.atualizar('');

      }, (erro: any)=>{
       Swal.fire({
         position: "top-end",
         icon: "error",
         title: erro.error.mesage,
         showConfirmButton: false,
         timer: 1500
       });

       this.closeModal();
       this.atualizar('');
     });
  }

  // Opem formulário modal
  openModal(game: any) {
    this.selectedGame = game;
    this.observacao = game.observacao;
    const modal = document.getElementById('gameModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Fechar frormulário modal
  closeModal() {
    this.selectedGame = null;
    const modal = document.getElementById('gameModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

}
