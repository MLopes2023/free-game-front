import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/servicos/autenticacao.service';
import { CepService } from 'src/app/servicos/cep.service';
import { MustMatch } from 'src/app/validacoes/password-match.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.css']
})
export class NovoCadastroComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private userHttp: AutenticacaoService,
    private router: Router,
    private cepHttp: CepService
  ) {
    this.userForm = new FormGroup({
      bairro: new FormControl('', Validators.required),
      cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cidade: new FormControl('', Validators.required),
      complemento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      endereco: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      senhapwd: new FormControl('', Validators.required),
      uf: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  // Conferência de senhas informadas (devem ser idênticas) 
  validarSenha() {
    if (this.userForm.get('senhapwd')?.value != this.userForm.get('confirmPassword')?.value) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Senhas não conferem",
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    return true;
  }

  // Consultar cep da api externa 
  onCepBlur() {

    const cep = this.userForm.get('cep')?.value;
    
    if (cep.length == 8) {
      this.cepHttp.consultaCep(cep).subscribe((resp: any) => {

        this.userForm.patchValue({
          bairro: resp.bairro,
          cidade: resp.localidade,
          complemento: resp.complemento,
          endereco: resp.logradouro,
          numero: resp.numero,
          uf: resp.uf,
        });


      }, (error: any) => {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: error.error.mesage,
          showConfirmButton: false,
          timer: 1500
        });
      })
    }
  }
  
  // Efetuda cadastro do usuário
  onSubmit(){
    if (this.userForm.valid) {
        
        //valida senha e confirma senha (devem ser idênticas)
        let senhasvalidas: boolean =  this.validarSenha()
        if (this.validarSenha() == false){
          return
        }
        
        // cadastra usuário
        this.userHttp.cadastro(this.userForm.value).subscribe( (resp:any)=>{
          if (resp.idusuario){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Usuario cadastrado com sucesso!",
              showConfirmButton: false,
              timer: 1500
            });
	        localStorage.setItem('idusuario', resp.idusuario);
          this.router.navigate(['/dashboard']);
          }else{

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Ocorreu erro ao cadastrar!",
              showConfirmButton: false,
              timer: 1500
            });

          }
        }, (error: any)=>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.error.mesage, 
            showConfirmButton: false,
            timer: 1500
          });
        })
    }else{
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: 'Formulario invalido!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

}
