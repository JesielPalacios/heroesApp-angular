import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  // heroe: HeroeModel = new HeroeModel();
  heroe = new HeroeModel();

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);

    if (id !== 'nuevo') {
      this.heroesService
        .getHeroe(id)
        // .subscribe(resp=>console.log(resp))
        .subscribe((resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        }); 
    }
    // else if (id === null) {
    //   this.router.navigate(['/heroes']);
    // }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido.');
      return;
    }
    // console.log(form);
    // console.log(this.heroe);

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      // this.heroesService
      //   .actualizarHeroe(this.heroe)
      //   .subscribe((resp) => console.log(resp));
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      // this.heroesService.crearHeroe(this.heroe).subscribe((resp) => {
      //   console.log(resp);
      //   // this.heroe = resp; // En caso de que no cree el id del heroe.
      // });
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success',
      });
    });
  }
}
