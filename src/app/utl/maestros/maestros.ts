import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProyectoapiService } from './proyectoapi.service';
import { MaestrosUtl } from './MaestrosUtl';
import { MaestrosFilterPipe } from './maestros-filter.pipe';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MaestrosFilterPipe],
  templateUrl: './maestros.html'
})
export class Maestros implements OnInit {
  listFilter = '';
  registros: MaestrosUtl[] = [];
  cargando = true;

  constructor(public api: ProyectoapiService) {}

  ngOnInit(): void {
    this.api.getMaestros().subscribe({
      next: (response: any) => {
        const lista = Array.isArray(response)
          ? response
          : response?.maestros ?? response?.data ?? response?.registros ?? [];
        this.registros = lista;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al consultar maestros:', error);
        this.cargando = false;
        alert('No se pudieron consultar los maestros. Verifica que Flask esté ejecutándose.');
      }
    });
  }
}
