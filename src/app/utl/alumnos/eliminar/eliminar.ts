import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-eliminar-alumno',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './eliminar.html'
})
export class Eliminar implements OnInit {
  matricula = '';
  eliminando = false;

  constructor(private route: ActivatedRoute, private api: ProyectoapiService, private router: Router) {}

  ngOnInit(): void {
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
    if (!this.matricula) {
      alert('No se recibió la matrícula para eliminar.');
      this.router.navigate(['/utl/alumnos']);
    }
  }

  eliminar(): void {
    if (!this.matricula || this.eliminando) return;
    if (!confirm(`¿Seguro que deseas eliminar el registro con matrícula ${this.matricula}?`)) return;

    this.eliminando = true;
    this.api.EliminaAlumno(this.matricula).subscribe({
      next: (respuesta) => {
        console.log('Respuesta de Flask al eliminar:', respuesta);
        alert('Alumno eliminado correctamente.');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al eliminar alumno:', error);
        const mensaje = error.error?.mensaje || error.error?.error || error.error?.message || error.message || 'No se pudo eliminar el registro.';
        alert(mensaje);
        this.eliminando = false;
      }
    });
  }
}
