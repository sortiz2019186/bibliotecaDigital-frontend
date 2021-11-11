import { Component, OnInit } from '@angular/core';
import { Revista } from 'src/app/models/revista.model';
import { RevistaService } from 'src/app/services/revista.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revistas',
  templateUrl: './revistas.component.html',
  styleUrls: ['./revistas.component.scss'],
  providers: [RevistaService, UsuarioService]
})
export class RevistasComponent implements OnInit {
  public token: String;
  public revistasList: any;
  public revistaIDModel: Revista;
  public revistaModel: Revista;

  constructor(private revistaService: RevistaService, private usuarioService: UsuarioService) {
    this.token = this.usuarioService.getToken();
    this.revistaIDModel = new Revista('', '', '', 0, '', '', 0, [], [], 0, 0);
    this.revistaModel = new Revista('', '', '', 0, '', '', 0, [], [], 0, 0);
  }

  ngOnInit(): void {
    this.obtenerRevistas();
  }

  crearRevista() {
    this.revistaService.crearRevista(this.revistaModel, this.token).subscribe(
      response => {
        console.log(response);

        this.obtenerRevistas();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Revista creada y guardada con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        this.obtenerRevistas();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message
        });
      }
    );
  }

  obtenerRevistas() {
    this.revistaService.obtenerRevistas(this.token).subscribe(
      response => {
        console.log(response.revistasEncontradas);
        this.revistasList = response.revistasEncontradas;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  obtenerRevista(id: any) {
    this.revistaService.obtenerRevista(id, this.token).subscribe(
      response => {
        console.log(response.revistaEncontrada);
        this.revistaIDModel = response.revistaEncontrada;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  modificarRevista() {
    this.revistaService.modificarRevista(this.revistaIDModel, this.token).subscribe(
      response => {
        console.log(response);

        this.obtenerRevistas();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Revista editada y guardada con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        this.obtenerRevistas();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message
        });
      }
    );
  }

  eliminarRevista(id: any) {
    this.revistaService.eliminarRevista(id, this.token).subscribe(
      response => {
        console.log(response);

        this.obtenerRevistas();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Revista eliminada con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
      },
      error => {
        console.log(<any>error);

        this.obtenerRevistas();

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message
        });
      }
    );
  }

}
