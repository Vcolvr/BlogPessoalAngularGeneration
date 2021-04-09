import { ComentarioService } from './../service/comentario.service';
import { Comentario } from './../model/Comentario';
import { AuthService } from './../service/auth.service';
import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { Postagem } from './../model/Postagem';
import { PostagemService } from './../service/postagem.service';
import { AlertasService } from './../service/alertas.service';
import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string = ''

  comentario: Comentario = new Comentario()
  listaComentarios: Comentario[]

  user: Usuario = new Usuario()

  idUserLogado = environment.idUser
  fotoUserLogado = environment.fotoUser
  nomeUserLogado = environment.nomeUser

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private alertas: AlertasService,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private comentarioService: ComentarioService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    this.findAllPostagens()
    this.findAllTemas()
    this.findByIdUser()
    //this.findallComentarios()
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
      console.log(this.listaPostagens)
    }, err => {
      console.log(this.listaPostagens)
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(environment.idUser).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByNomeTema() {
    console.log(this.nomeTema)
    if (this.nomeTema == '') {
      this.findAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.findAllPostagens()
    } else {
      this.postagemService.getByNomePostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }

  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.user.idUsuario = environment.idUser
    this.postagem.usuario = this.user
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.findAllPostagens()
      this.findByIdUser()
      this.findAllTemas()
      this.postagem = new Postagem()
    })
  }

  comentar(id: number){

    this.user.idUsuario = this.idUserLogado;
    this.comentario.usuario = this.user;

    this.postagem.id = id;
    this.comentario.postagem = this.postagem;

   

  }


}