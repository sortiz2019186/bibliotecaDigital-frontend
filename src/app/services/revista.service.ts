import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Revista } from '../models/revista.model';

@Injectable({
  providedIn: 'root'
})
export class RevistaService {
  public ruta: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public http: HttpClient) {
    this.ruta = GLOBAL.url;
  }

  crearRevista(revista: Revista, token: any): Observable<any> {
    let body = JSON.stringify(revista);
    let headersToken = this.headersVariable.set('token', token);

    return this.http.post(`${ this.ruta }crearRevista`, body, { headers: headersToken });
  }

  obtenerRevistas(token: any): Observable<any> {
    let  headersToken = this.headersVariable.set('token', token);

    return this.http.get(`${ this.ruta }obtenerRevistas`, { headers: headersToken });
  }

  obtenerRevista(id: String, token: any): Observable<any> {
    let headersToken = this.headersVariable.set('token', token);

    return this.http.get(`${ this.ruta }obtenerRevista/${ id }`, { headers: headersToken });
  }

  modificarRevista(revista: Revista, token: any): Observable<any> {
    let body = JSON.stringify(revista);
    let headersToken = this.headersVariable.set('token', token);

    return this.http.put(`${ this.ruta }modificarRevista/${ revista._id }`, body, { headers: headersToken });
  }

  eliminarRevista(id: String, token: any) {
    let headersToken = this.headersVariable.set('token', token);

    return this.http.delete(`${ this.ruta }eliminarRevista/${ id }`, { headers: headersToken });
  }
}
