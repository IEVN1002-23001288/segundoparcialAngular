import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';
import { AlumnosUtl } from '../AlumnosUtl';

@Component({
  selector: 'app-agregar-alumno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.html'
})
export class Agregar {
  formGroup: FormGroup;
  enviando = false;

  constructor(private fb: FormBuilder, private api: ProyectoapiService, private router: Router) {
    this.formGroup = this.fb.group({
      matricula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apaterno: ['', [Validators.required]],
      amaterno: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid || this.enviando) {
      console.log('Formulario inválido:', this.formGroup.errors, this.formGroup.value);
      Object.keys(this.formGroup.controls).forEach(c => {
        const control = this.formGroup.get(c);
        if (control?.invalid) console.log(`Campo ${c} inválido:`, control.errors, control.value);
      });
      alert('Revisa los campos. La matrícula, nombre, apellidos y un correo válido son obligatorios.');
      return;
    }

    const raw = this.formGroup.getRawValue();
    const datos: AlumnosUtl = {
      matricula: String(raw.matricula).trim(),
      nombre: String(raw.nombre).trim(),
      apaterno: String(raw.apaterno).trim(),
      amaterno: String(raw.amaterno).trim(),
      correo: String(raw.correo).trim()
    };

    this.enviando = true;
    console.log('Datos que se enviarán a Flask:', datos);
    this.api.agregarNuevoAlumno(datos).subscribe({
      next: (respuesta) => {
        console.log('Respuesta de Flask:', respuesta);
        alert('Alumno registrado correctamente.');
        this.formGroup.reset();
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error de Flask al registrar alumno:', error);
        const mensaje = error.error?.mensaje || error.error?.error || error.error?.message || error.message || 'No se pudo registrar el alumno.';
        alert(mensaje);
        this.enviando = false;
      },
      complete: () => this.enviando = false
    });
  }
}
