import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AutenticacaoService } from 'src/app/servicos/autenticacao.service';
import { CepService } from 'src/app/servicos/cep.service';
import { MustMatch } from 'src/app/validacoes/password-match.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  id: any;
  userForm!: FormGroup;

  constructor(private userHttp: AutenticacaoService,
    private routers: Router,
    private router: ActivatedRoute,
    private cepHttp: CepService
  ) {
    this.userForm = new FormGroup({
      idusuario: new FormControl(0),
      bairro: new FormControl('', Validators.required),
      cep: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cidade: new FormControl('', Validators.required),
      complemento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      endereco: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required), 
      uf: new FormControl('', Validators.required), 
    });
  }

  ngOnInit(): void {

    this.router.paramMap.subscribe(async (params:any) => {
      this.id = params.get('id') ?? "";
      this.carregaInformacoes();
    });
  }

  // Carrega informações no formulário do usuário
  carregaInformacoes(){
    this.userHttp.buscarId(this.id).subscribe(
      (res: any)=>{
        this.userForm.patchValue({
          idusuario: res.idusuario || 0,
          bairro: res.bairro || '',
          cep: res.cep || '',
          cidade: res.cidade || '',
          complemento: res.complemento || '',
          email: res.email || '',
          endereco: res.endereco || '',
          nome: res.nome || '',
          numero: res.numero || '',
          uf: res.uf || '',
        });
      }, (error)=>{
        this.routers.navigate(['dashboard'])
      }
    )
  }

  // Edita cadastro do usuário  
  onSubmit(){
    if (this.userForm.valid) {
        this.userHttp.editar(this.userForm.value).subscribe( (resp:any)=>{
          if (resp.idusuario){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Usuario atualizado com sucesso!",
              showConfirmButton: false,
              timer: 1500
            });
          this.routers.navigate(['/dashboard']);
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

  // Consulta cep da api externa 
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

}
