import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICine } from '../cinepolis';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-registros',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ver-registros.html'
})
export class VerRegistros implements OnInit {

  cines: ICine[] = [];
  formulario!: FormGroup;
  indiceEdicion: number = -1;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(0),
      tarjetaCineco: new FormControl(''),
      cantidadBoletos: new FormControl(0)
    });

    this.cargarCines();
  }

  cargarCines(): void {
    const datos = localStorage.getItem('cines');
    this.cines = datos ? JSON.parse(datos) : [];
  }

  editarCine(index: number): void {
    const cine = this.cines[index];

    this.indiceEdicion = index;

    this.formulario.patchValue({
      nombre: cine.nombre,
      cantidadCompradores: cine.cantidadCompradores,
      tarjetaCineco: cine.tarjetaCineco,
      cantidadBoletos: cine.cantidadBoletos
    });
  }

 
cargar(): void {
  if (this.indiceEdicion === -1) {
    return;
  }

  const datos = this.formulario.value;

  const nuevaVenta: ICine = {
    nombre: datos.nombre,
    cantidadCompradores: Number(datos.cantidadCompradores),
    tarjetaCineco: datos.tarjetaCineco,
    cantidadBoletos: Number(datos.cantidadBoletos),
    valorPagar: 0
  };

  if (
    nuevaVenta.nombre === '' ||
    nuevaVenta.cantidadCompradores <= 0 ||
    nuevaVenta.tarjetaCineco === '' ||
    nuevaVenta.cantidadBoletos <= 0
  ) {
    alert('Todos los campos son obligatorios');
    return;
  }

  if (
    nuevaVenta.cantidadBoletos >
    nuevaVenta.cantidadCompradores * 7
  ) {
    alert('Maximo 7 boletos por persona');
    return;
  }

  nuevaVenta.valorPagar = nuevaVenta.cantidadBoletos * 12;

  if (nuevaVenta.cantidadBoletos > 5) {
    nuevaVenta.valorPagar = nuevaVenta.valorPagar - (nuevaVenta.valorPagar * 0.15);
  } else if (nuevaVenta.cantidadBoletos >= 3) {
    nuevaVenta.valorPagar = nuevaVenta.valorPagar - (nuevaVenta.valorPagar * 0.10);
  }

  switch (nuevaVenta.tarjetaCineco) {
    case 'si':
      nuevaVenta.valorPagar = nuevaVenta.valorPagar - (nuevaVenta.valorPagar * 0.10);
      break;

    case 'no':
      break;
  }

  this.cines[this.indiceEdicion] = nuevaVenta;

  localStorage.setItem('cines', JSON.stringify(this.cines));

  this.cargarCines();

  this.formulario.reset({
    nombre: '',
    cantidadCompradores: 0,
    tarjetaCineco: '',
    cantidadBoletos: 0
  });

  this.indiceEdicion = -1;
}


  eliminarCine(index: number): void {
      this.cines.splice(index, 1);

      localStorage.setItem(
        'cines',
        JSON.stringify(this.cines)
      );

      if (this.indiceEdicion === index) {
      }
      else if (this.indiceEdicion > index) {
        this.indiceEdicion--;
      }
    
  }

  
}
