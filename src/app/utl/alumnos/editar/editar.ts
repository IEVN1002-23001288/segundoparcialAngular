import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';
import { AlumnosUtl } from '../AlumnosUtl';

@Component({
  selector: 'app-editar-alumno',
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
      this.router.navigate(['/utl/alumnos']);
      return;
    }
    this.api.getAlumno(this.matricula).subscribe({
      next: (response: any) => {
        const registro = response?.alumno ?? response?.data ?? response;
        if (!registro) {
          alert('No se encontró el registro.');
          this.router.navigate(['/utl/alumnos']);
          return;
        }
        this.formulario.patchValue(registro);
      },
      error: (error) => {
        console.error('Error al consultar alumno:', error);
        alert('No se pudo cargar el registro.');
        this.router.navigate(['/utl/alumnos']);
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const datos = this.formulario.getRawValue() as AlumnosUtl;
    datos.matricula = Number(this.matricula);
    this.api.modificarAlumno(Number(this.matricula), datos).subscribe({
      next: (response) => {
        alert('Alumno actualizado correctamente.');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al actualizar alumno:', error);
        alert(error.error?.mensaje || error.error?.error || 'No se pudo actualizar el registro.');
      }
    });
  }
}
