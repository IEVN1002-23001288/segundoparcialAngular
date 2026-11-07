import { Pipe, PipeTransform } from '@angular/core';
import { MaestrosUtl } from './MaestrosUtl';

@Pipe({ name: 'maestroFilter', standalone: true })
export class MaestrosFilterPipe implements PipeTransform {
  transform(value: MaestrosUtl[] | null | undefined, args: string = ''): MaestrosUtl[] {
    const lista = value ?? [];
    const filtro = (args ?? '').toLocaleLowerCase().trim();
    return filtro ? lista.filter(registro =>
      registro.nombre.toLocaleLowerCase().includes(filtro)
    ) : lista;
  }
}
