import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  entrar(){
    this.auth.logar(this.userLogin).subscribe((resp: UsuarioLogin) => {
      this.userLogin = resp
      environment.fotoUser = this.userLogin.foto
      environment.nomeUser = this.userLogin.nome
      environment.tipoUser = this.userLogin.tipo
      environment.token = this.userLogin.token
      environment.idUser = this.userLogin.idUsuario

      this.router.navigate(['/inicio'])
    })
  }

}
