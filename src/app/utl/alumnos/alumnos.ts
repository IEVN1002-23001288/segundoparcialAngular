import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProyectoapiService } from './proyectoapi.service';
import { AlumnosUtl } from './AlumnosUtl';
import { AlumnosFilterPipe } from './alumnos-filter.pipe';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AlumnosFilterPipe],
  templateUrl: './alumnos.html'
})
export class alumnos implements OnInit {
  listFilter = '';
  registros: AlumnosUtl[] = [];
  cargando = true;

  constructor(public api: ProyectoapiService) {}

  ngOnInit(): void {
    this.api.getAlumnos().subscribe({
      next: (response: any) => {
        const lista = Array.isArray(response)
          ? response
          : response?.alumnos ?? response?.data ?? response?.registros ?? [];
        this.registros = lista;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al consultar alumnos:', error);
        this.cargando = false;
        alert('No se pudieron consultar los alumnos. Verifica que Flask esté ejecutándose.');
      }
    });
  }
}
