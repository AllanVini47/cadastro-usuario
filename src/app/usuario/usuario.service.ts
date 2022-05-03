import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
export interface IUsuarioDataSource {
  Usuarios: Usuario[]; Total: number
}
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private _http: HttpClient) {}

  private _apiUrl = environment.apiUrl;

  public getUsuarios(
    page: number,
    limit: number
  ): Observable<any> {
    return this._http
      .get<Observable<IUsuarioDataSource>>(
        this._apiUrl +
          '/usuarios?_page=' +
          JSON.stringify(page) +
          '&_limit=' +
          JSON.stringify(limit),
        { observe: 'response' }
      ).pipe(map(res => ({Usuarios: res.body, Total : res.headers.get('X-Total-Count')})));
  }
}
