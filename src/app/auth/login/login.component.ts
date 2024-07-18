import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AutenticacaoService } from 'src/app/servicos/autenticacao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  
  constructor(
    private loginHttp: AutenticacaoService,
    private fb: FormBuilder, 
    private router: Router,
  ) { 
    this.loginForm = this.fb.group({
      emailpwd: new FormControl('', [Validators.required]),
      senhapwd: new FormControl('', [Validators.required]), 
    });
  }

  ngOnInit(): void {
  }

  //Efetuar login do usuário
  onSubmit(){
    if(this.loginForm.valid){
        this.loginHttp.login(this.loginForm.value).subscribe( (response:any)=>{
          if(response.situacaoauth){
            localStorage.setItem('idusuario', response.idusuarioauth );
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: response.mensagemauth,
              showConfirmButton: false,
              timer: 1500
            });
            this.loginHttp.updateLoggedIn(true);
            this.router.navigate(['/dashboard']);
          }else{

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: response.mensagemauth,
              showConfirmButton: false,
              timer: 1500
            });

          }
        }, (error: any)=>{

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.error.mesage, //{"mesage":"Usu\u00e1rio n\u00e3o encontrado."}
            showConfirmButton: false,
            timer: 1500
          });
          this.loginHttp.updateLoggedIn(false);
        })
    }else{

      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: 'Formulario invalido!',
        showConfirmButton: false,
        timer: 1500
      });
      this.loginHttp.updateLoggedIn(false);
    }
  }
}
