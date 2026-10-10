import { Component, OnInit } from '@angular/core';
import { ICine } from '../cinepolis';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-cinepolis',
  templateUrl: './cinepolis.html',
})
export class Cinepolis implements OnInit{
  
  formulario!: FormGroup;
  
  
  nuevaVenta: ICine = {
    nombre:'',
    cantidadCompradores: 0,
    tarjetaCineco: '',
    cantidadBoletos: 0,
    valorPagar:0
  };
  
  ngOnInit(): void {
    
    
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(''),
      tarjetaCineco: new FormControl(''),
      cantidadBoletos: new FormControl(''),
    });
    
  }
  muestraCine():void{
    this.nuevaVenta.nombre=this.formulario.value.nombre
    this.nuevaVenta.cantidadCompradores=this.formulario.value.cantidadCompradores
    this.nuevaVenta.tarjetaCineco=this.formulario.value.tarjetaCineco
    this.nuevaVenta.cantidadBoletos=this.formulario.value.cantidadBoletos
    
    if (this.nuevaVenta.cantidadBoletos>this.nuevaVenta.cantidadCompradores * 7) {
      alert('Maximo 7 boletos por persona')
      this.nuevaVenta.cantidadBoletos = 0
      this.nuevaVenta.tarjetaCineco = ''
      this.nuevaVenta.nombre = ''
      this.nuevaVenta.cantidadCompradores = 0
      return;
    }

    this.nuevaVenta.valorPagar = this.nuevaVenta.cantidadBoletos * 12;

    if (this.nuevaVenta.cantidadBoletos>5) {
      this.nuevaVenta.valorPagar = this.nuevaVenta.valorPagar - (this.nuevaVenta.valorPagar * 0.15)
    } 
    else if(this.nuevaVenta.cantidadBoletos>=3){
      this.nuevaVenta.valorPagar = this.nuevaVenta.valorPagar - (this.nuevaVenta.valorPagar * 0.10)
    }

    switch(this.nuevaVenta.tarjetaCineco){
      case 'si':
        this.nuevaVenta.valorPagar = this.nuevaVenta.valorPagar - (this.nuevaVenta.valorPagar * 0.10);
        break;

      case 'no':
        break;

    }
  }
  
} 

