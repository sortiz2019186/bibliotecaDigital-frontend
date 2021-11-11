import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token: any;

  constructor(private http: HttpClient, private router: Router) {
    this.ruta = GLOBAL.url;
  }

  getToken() {
    var token2 = localStorage.getItem('token');

    if (token2 != 'undefined') {
      this.token = token2;
    } else {
      this.token = null;
    }

    return this.token;
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    let body = JSON.stringify(usuario);
    let headersToken = this.headersVariable.set('token', this.getToken());

    return this.http.post(`${ this.ruta }crearUsuario`, body, { headers: headersToken });
  }

  obtenerUsuarios(): Observable<any> {
    let headersToken = this.headersVariable.set('token', this.getToken());

    return this.http.get(`${ this.ruta }obtenerUsuarios`, { headers: headersToken });
  }

  obtenerUsuario(id: String): Observable<any> {
    let headersToken = this.headersVariable.set('token', this.getToken());

    return this.http.get(`${ this.ruta }obtenerUsuario/${ id }`, { headers: headersToken });
  }

  modificarUsuario(usuario: Usuario): Observable<any> {
    let body = JSON.stringify(usuario);
    let headersToken = this.headersVariable.set('token', this.getToken());

    return this.http.put(`${ this.ruta }modificarUsuario/${ usuario._id }`, body, { headers: headersToken });
  }

  eliminarUsuario(id: String): Observable<any> {
    let headersToken = this.headersVariable.set('token', this.getToken());

    return this.http.delete(`${ this.ruta }eliminarUsuario/${ id }`, { headers: headersToken });
  }
}
