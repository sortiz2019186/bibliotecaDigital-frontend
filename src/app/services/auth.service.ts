import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public ruta: String;
  public headersVariable =  new HttpHeaders().set('Content-Type', 'application/json');
  public token: any;
  public identidad: any;

  constructor(private http: HttpClient, private router: Router) {
    this.ruta = GLOBAL.url;
  }

  login(usuario: any):Observable<any> {
    let body = JSON.stringify(usuario);

    return this.http.post(`${ this.ruta }login`, body, { headers: this.headersVariable });
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');

    this.router.navigate(['/home']);
  }
}
