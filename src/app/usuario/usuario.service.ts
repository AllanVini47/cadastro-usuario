import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
export interface IUsuarioDataSource {
  Usuarios: Usuario[];
  Total: number;
}
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private _http: HttpClient) {}

  private _apiUrl = environment.apiUrl;
  private _options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  public getUsuarios(page: number, limit: number): Observable<any> {
    return this._http
      .get<Observable<IUsuarioDataSource>>(
        this._apiUrl + `/usuario?_page=${page}&_limit=${limit}`,
        { observe: 'response' }
      )
      .pipe(
        map((res) => ({
          Usuarios: res.body,
          Total: res.headers.get('X-Total-Count'),
        }))
      );
  }

  public getById(id: number): Observable<Usuario> {
    return this._http
      .get<Observable<Usuario>>(this._apiUrl + `/usuario/${id}`, {
        observe: 'response',
      })
      .pipe(
        map((res) => {
          return new Usuario(res.body);
        })
      );
  }

  public postUsuario(usuario: Usuario) {
    return this._http.post(
      this._apiUrl + '/usuario',
      this._stringfyUsuarioPost(usuario),
      this._options
    );
  }

  private _stringfyUsuarioPost(usuario: Usuario): string {
    return (
      '{ "nome":' +
      JSON.stringify(usuario.nome) +
      ', "dataNascimento":' +
      JSON.stringify(usuario.dataNascimento) +
      ', "foto":' +
      JSON.stringify(usuario.foto) +
      '}'
    );
  }

  public putUsuario(usuario: Usuario) {
    return this._http.put(
      this._apiUrl + `/usuario/${usuario.id}`,
      this._stringfyUsuarioPut(usuario),
      this._options
    );
  }

  private _stringfyUsuarioPut(usuario: Usuario): string {
    return (
      '{ "id":' +
      JSON.stringify(usuario.id) +
      ', "nome":' +
      JSON.stringify(usuario.nome) +
      ', "dataNascimento":' +
      JSON.stringify(usuario.dataNascimento) +
      ', "foto":' +
      JSON.stringify(usuario.foto) +
      '}'
    );
  }

  public deleteUsuario(usuario: Usuario) {
    return this._http.delete(
      this._apiUrl + `/usuario/${usuario.id}`
    );
  }
}
