import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';
import { MaestrosUtl } from '../MaestrosUtl';

@Component({
  selector: 'app-editar-maestro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editar.html'
})
export class Editar implements OnInit {
  formulario: FormGroup;
  matricula = '';

  constructor(
    private route: ActivatedRoute,
    private api: ProyectoapiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      matricula: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
    if (!this.matricula) {
      alert('No se recibió la matrícula.');
      this.router.navigate(['/utl/maestros']);
      return;
    }
    this.api.getMaestro(this.matricula).subscribe({
      next: (response: any) => {
        const registro = response?.maestro ?? response?.data ?? response;
        if (!registro) {
          alert('No se encontró el registro.');
          this.router.navigate(['/utl/maestros']);
          return;
        }
        this.formulario.patchValue(registro);
      },
      error: (error) => {
        console.error('Error al consultar maestro:', error);
        alert('No se pudo cargar el registro.');
        this.router.navigate(['/utl/maestros']);
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const datos = this.formulario.getRawValue() as MaestrosUtl;
    datos.matricula = Number(this.matricula);
    this.api.modificarMaestro(Number(this.matricula), datos).subscribe({
      next: (response) => {
        alert('Maestro actualizado correctamente.');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al actualizar maestro:', error);
        alert(error.error?.mensaje || error.error?.error || 'No se pudo actualizar el registro.');
      }
    });
  }
}
