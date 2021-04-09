import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  //O Observable mapeia o retorno do médoto.
  logar(userLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>(`${environment.server}/usuarios/logar`, userLogin)
  }

  cadastrar(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${environment.server}/usuarios/cadastrar`, user)
  }

  getAllUsers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${environment.server}/usuarios`, this.token)
  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${environment.server}/usuarios/${id}`, this.token)
  }

  putUser(user: Usuario) : Observable<Usuario>{
    return this.http.put<Usuario>(`${environment.server}/usuarios`, user, this.token)
  }

  menu(){
    let ok = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }


}
