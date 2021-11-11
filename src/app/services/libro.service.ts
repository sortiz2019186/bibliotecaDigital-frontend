import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public http: HttpClient) {
    this.ruta = GLOBAL.url;
  }

  crearLibro(libro: Libro, token: any): Observable<any> {
    let body = JSON.stringify(libro);
    let headersToken = this.headersVariable.set('token', token);

    return this.http.post(`${ this.ruta }crearLibro`, body, { headers: headersToken });
  }

  obtenerLibros(token: any): Observable<any> {
    let headersToken = this.headersVariable.set('token', token);

    return this.http.get(`${ this.ruta }obtenerLibros`, { headers: headersToken });
  }

  obtenerLibro(id: String, token: any): Observable<any> {
    let headersToken = this.headersVariable.set('token', token);

    return this.http.get(`${ this.ruta }obtenerLibro/${ id }`, { headers: headersToken });
  }

  modificarLibro(libro: Libro, token: any): Observable<any> {
    let body = JSON.stringify(libro);
    let headersToken = this.headersVariable.set('token', token);

    return this.http.put(`${ this.ruta }modificarLibro/${ libro._id }`, body, { headers: headersToken });
  }

  eliminarLibro(id: String, token: any): Observable<any> {
    let headersToken = this.headersVariable.set('token', token);

    return this.http.delete(`${ this.ruta }eliminarLibro/${ id }`, { headers: headersToken });
  }
}
