import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUtl } from './AlumnosUtl';

@Pipe({ name: 'alumnoFilter', standalone: true })
export class AlumnosFilterPipe implements PipeTransform {
  transform(value: AlumnosUtl[] | null | undefined, args: string = ''): AlumnosUtl[] {
    const lista = value ?? [];
    const filtro = (args ?? '').toLocaleLowerCase().trim();
    return filtro ? lista.filter(registro =>
      registro.nombre.toLocaleLowerCase().includes(filtro)
    ) : lista;
  }
}
