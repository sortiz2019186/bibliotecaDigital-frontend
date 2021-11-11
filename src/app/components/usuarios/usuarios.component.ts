import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  public usuariosList: any;
  public usuarioIDModel: Usuario;
  public usuarioModel: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.usuarioModel =  new Usuario('', 0, '', '', '', '', '', '');
    this.usuarioIDModel = new Usuario('', 0, '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  crearUsuario() {
    this.usuarioService.crearUsuario(this.usuarioModel).subscribe(
      response => {
        console.log(response);

        this.obtenerUsuarios();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Usuario creado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        this.obtenerUsuarios();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message
        });
      }
    );
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      response => {
        console.log(response.usuariosEncontrados);
        this.usuariosList = response.usuariosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  obtenerUsuario(id: any) {
    this.usuarioService.obtenerUsuario(id).subscribe(
      response => {
        console.log(response.usuarioEncontrado);
        this.usuarioIDModel = response.usuarioEncontrado
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  modificarUsuario() {
    this.usuarioService.modificarUsuario(this.usuarioIDModel).subscribe(
      response => {
        console.log(response);

        this.obtenerUsuarios();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Usuario editado y guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        this.obtenerUsuarios();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message
        });
      }
    );
  }

  eliminarUsuario(id: any) {
    this.usuarioService.eliminarUsuario(id).subscribe(
      response => {
        console.log(response);

        this.obtenerUsuarios();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Usuario eliminado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        this.obtenerUsuarios();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message
        });
      }
    );
  }
}
