import { Component, OnInit } from '@angular/core';
import { IAlumnos } from '../alumnos';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos implements OnInit {

  formulario!: FormGroup;
  alumnos: IAlumnos[] = [];
  indiceEdicion:number=-1

  nuevoAlumno: IAlumnos = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  ngOnInit(): void {

    this.cargarAlumnos()

    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    })

  }

    agregarAlumno():void{
      if 
      (
        this.nuevaVenta.matricula === '' ||
        this.nuevaVenta.nombre === '' ||
        this.nuevaVenta.correo === '' ||
        this.nuevaVenta.materia === ''
      ) {
        alert('Todos los campos son obligatorios');
        return;
      }

      if (this.indiceEdicion !== -1) {
        this.alumnos[this.indiceEdicion]={
          ...this.nuevAlumno
        }
      }
      else{
        this.alumnos.push({...this.nuevoAlumno})
      }

      localStorage.setItem(
        'alumno',
        JSON.stringify(this.alumno)
      )
      this.limpiarCampos()
    }

   muestraAlumnos():void{
          this.nuevoAlumno.matricula=this.formulario.value.matricula
          this.nuevoAlumno.nombre=this.formulario.value.nombre
          this.nuevoAlumno.correo=this.formulario.value.correo
          this.nuevoAlumno.materia=this.formulario.value.materia
          this.agregarAlumno()
        }

  cargarAlumnos(): void {
    
    const datos = localStorage.getIem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos);
    }

  }

  editarAlumnos(index:number):void{
    this.nuevoAlumno={
      ...this.alumnos[index]
    }
    const alumno.this.alumnos[index]
    this.formulario.patchValue({
      matricula:alumno.matricula,
      nombre:alumno.nombre,
      correo:alumno.correo,
      materia:alumno.materia
    })
    this.indiceEdicion=index
  }

  eliminarAlumno(index: number): void{
    this.alumnos.splice(index,1)
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )
  }

  limpiarCampos():void{
    this.nuevAlumno={
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    }
    this.indiceEdicion=-1
  }

}