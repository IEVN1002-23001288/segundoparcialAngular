import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-eliminar-maestro',
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
      this.router.navigate(['/utl/maestros']);
    }
  }

  eliminar(): void {
    if (!this.matricula || this.eliminando) return;
    if (!confirm(`¿Seguro que deseas eliminar el registro con matrícula ${this.matricula}?`)) return;

    this.eliminando = true;
    this.api.EliminaMaestro(this.matricula).subscribe({
      next: (respuesta) => {
        console.log('Respuesta de Flask al eliminar:', respuesta);
        alert('Maestro eliminado correctamente.');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al eliminar maestro:', error);
        const mensaje = error.error?.mensaje || error.error?.error || error.error?.message || error.message || 'No se pudo eliminar el registro.';
        alert(mensaje);
        this.eliminando = false;
      }
    });
  }
}
