import { Component, OnInit } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICinepoli } from '../cinepoli';

@Component({
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-ver-registros',
  templateUrl: './ver-registros.html',
})
export class VerRegistros implements OnInit {
  formulario!: FormGroup;
  precioBoleto: number = 12;
  total: number = 0;
  descuento: number = 0;

  cinepolis: ICinepoli[] = [];
  indiceEdicion: number = -1;
  nuevoCinepolis: ICinepoli = {
    nombre: '',
    cantidad: 0,
    tarjeta: '',
    boletos: 0,
    Pagar: 0,
    error: '',
  };

  ngOnInit(): void {
    this.cargarRegistros();
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidad: new FormControl(''),
      tarjeta: new FormControl(''),
      boletos: new FormControl(''),
      Pagar: new FormControl(''),
    });
  }

  agregarRegistro(): void {
    if (
      this.nuevoCinepolis.nombre === '' ||
      this.nuevoCinepolis.cantidad === 0 ||
      this.nuevoCinepolis.tarjeta === '' ||
      this.nuevoCinepolis.boletos === 0
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.indiceEdicion !== -1) {
      this.cinepolis[this.indiceEdicion] = {
        ...this.nuevoCinepolis
      };
    } else {
      this.cinepolis.push({ ...this.nuevoCinepolis });
    }

    localStorage.setItem(
      'cinepolis',
      JSON.stringify(this.cinepolis)
    );
    
    // Se comenta para que los datos no se borren de la pantalla inmediatamente
    // this.limpiarCampos();
  }

  muestraCinepolis(): void {
    this.nuevoCinepolis.nombre = this.formulario.value.nombre;
    this.nuevoCinepolis.cantidad = Number(this.formulario.value.cantidad);
    this.nuevoCinepolis.tarjeta = this.formulario.value.tarjeta;
    this.nuevoCinepolis.boletos = Number(this.formulario.value.boletos);
    
    // 1. Primero realiza los cálculos
    this.salidaCinepolis();
    
    // 2. Actualiza el formulario visualmente con el precio calculado
    this.formulario.patchValue({
      Pagar: this.nuevoCinepolis.Pagar
    });

    // 3. Guarda el registro en la tabla y en localStorage
    this.agregarRegistro();
  }

  salidaCinepolis(): void {
    this.total = this.nuevoCinepolis.boletos * this.precioBoleto;
    if (this.nuevoCinepolis.boletos <= (this.nuevoCinepolis.cantidad * 7)) {
      if (this.nuevoCinepolis.boletos > 5) {
        this.descuento = this.total * 0.15;
      }
      if (this.nuevoCinepolis.boletos >= 3 && this.nuevoCinepolis.boletos <= 5) {
        this.descuento = this.total * 0.10;
      }
      if (this.nuevoCinepolis.boletos <= 2) {
        this.descuento = 0;
      }
      
      this.nuevoCinepolis.Pagar = this.total - this.descuento;
      
      if (this.nuevoCinepolis.tarjeta == 'si') {
        this.nuevoCinepolis.Pagar = this.nuevoCinepolis.Pagar - (this.nuevoCinepolis.Pagar * 0.10);
      }
      this.nuevoCinepolis.error = ''; // Limpiar errores previos
    } else {
      this.nuevoCinepolis.Pagar = 0;
      this.nuevoCinepolis.error = 'Maximo numero de boletos por comprador son 7';
    }
  }

  cargarRegistros(): void {
    const datos = localStorage.getItem('cinepolis');
    if (datos) {
      this.cinepolis = JSON.parse(datos);
    }
  }

  editarRegistros(index: number): void {
    this.nuevoCinepolis = {
      ...this.cinepolis[index]
    };
    const cinepoli = this.cinepolis[index];
    this.formulario.patchValue({
      nombre: cinepoli.nombre,
      cantidad: cinepoli.cantidad,
      tarjeta: cinepoli.tarjeta,
      boletos: cinepoli.boletos,
      Pagar: cinepoli.Pagar
    });

    this.indiceEdicion = index;
  }

  eliminarRegistros(index: number): void {
    this.cinepolis.splice(index, 1);
    localStorage.setItem(
      'cinepolis',
      JSON.stringify(this.cinepolis)
    );
  }

  limpiarCampos(): void {
    this.nuevoCinepolis = {
      nombre: '',
      cantidad: 0,
      tarjeta: '',
      boletos: 0,
      Pagar: 0,
      error: '',
    };
    this.formulario.patchValue({
      nombre: this.nuevoCinepolis.nombre,
      cantidad: this.nuevoCinepolis.cantidad,
      tarjeta: this.nuevoCinepolis.tarjeta,
      boletos: this.nuevoCinepolis.boletos,
      Pagar: this.nuevoCinepolis.Pagar
    });
    this.indiceEdicion = -1;
  }
}