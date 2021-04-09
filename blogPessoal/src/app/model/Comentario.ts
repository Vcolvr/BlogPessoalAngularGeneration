import { Postagem } from './Postagem';
import { Usuario } from './Usuario';


export class Comentario {
  public id: number
  public usuario: Usuario
  public postagem: Postagem
  public comentario: string
  public data: Date
}