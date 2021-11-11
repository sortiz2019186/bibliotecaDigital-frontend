import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;
  public token: any;
  public identidad: any;

  constructor(private authService: AuthService, private router: Router) {
    this.usuarioModel = new Usuario('', 0, '', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  getToken() {
    this.authService.login(this.usuarioModel).subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  login() {
    this.authService.login(this.usuarioModel).subscribe(
      response => {
        console.log(response);

        this.getToken();

        this.router.navigate(['/usuarios']);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Has iniciado sesión exitosamente!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
      }
    );
  }

}
