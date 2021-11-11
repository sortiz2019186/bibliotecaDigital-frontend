import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss'],
  providers: [LibroService, UsuarioService]
})
export class LibrosComponent implements OnInit {
  public token: String;
  public librosList: any;
  public libroIDModel: Libro;
  public libroModel: Libro

  constructor(private libroService: LibroService, private usuarioService: UsuarioService) {
    this.token = this.usuarioService.getToken();
    this.libroIDModel = new Libro('', '', '', 0, [], '', [], 0, 0);
    this.libroModel = new Libro('', '', '', 0, [], '', [], 0, 0);
  }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  crearLibro() {
    this.libroService.crearLibro(this.libroModel, this.token).subscribe(
      response => {
        console.log(response);

        this.obtenerLibros();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Libro creado y guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        this.obtenerLibros();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message
        });
      }
    );
  }

  obtenerLibros() {
    this.libroService.obtenerLibros(this.token).subscribe(
      response => {
        console.log(response.librosEncontrados);
        this.librosList = response.librosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  obtenerLibro(id: String) {
    this.libroService.obtenerLibro(id, this.token).subscribe(
      response => {
        console.log(response.libroEncontrado);
        this.libroIDModel = response.libroEncontrado;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  modificarLibro() {
    this.libroService.modificarLibro(this.libroIDModel, this.token).subscribe(
      response => {
        console.log(response);

        this.obtenerLibros();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Libro editado y guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        this.obtenerLibros();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message
        });
      }
    );
  }

  eliminarLibro(id: String) {
    this.libroService.eliminarLibro(id, this.token).subscribe(
      response => {
        console.log(response);

        this.obtenerLibros();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Libro eliminado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        this.obtenerLibros();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message
        });
      }
    );
  }

}
