import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';

import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://primer-app-d7f9a-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    // return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroe);

    const heroeTemp = {
      ...heroe,
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id: string) {
    // return this.http.get(`${this.url}/heroes/${id}.json`);
    return this.http.get(`${this.url}/heroes/${id}.json`)
      .pipe(
        map(this.crearArreglo),
        delay(1500)
    )
  }

  getHeroes() {
    // return this.http.get(`${this.url}/heroes.json`);

    return (
      this.http
        .get(`${this.url}/heroes.json`)
        // .pipe(map((resp: any) => this.crearArreglo(resp)));
        .pipe(map(this.crearArreglo))
    );
  }

  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[] = [];

    // console.log(heroesObj);

    // if (heroesObj == null) {return []}
    if (heroesObj == null) return [];

    Object.keys(heroesObj).forEach((key) => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    // return 'Hola Mundo';
    return heroes;
  }
}
