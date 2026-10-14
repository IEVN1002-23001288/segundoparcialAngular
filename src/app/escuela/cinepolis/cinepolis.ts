  import { Component, OnInit } from '@angular/core';
  import { ICine } from '../cinepolis';
  import { CommonModule } from "@angular/common";
  import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
  import { RouterLink } from '@angular/router';

  @Component({
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
    selector: 'app-cinepolis',
    templateUrl: './cinepolis.html',
  })
  export class Cinepolis implements OnInit{
    
    formulario!: FormGroup;
      cines:ICine[]=[]
    /*indiceEdicion:number=-1 */

    
    
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
        cantidadCompradores: new FormControl(0),
        tarjetaCineco: new FormControl(''),
        cantidadBoletos: new FormControl(0),
      });
          this.cargarCine();

      
    }
    
    cargarCine():void{
      const datos = localStorage.getItem('cines');
      
      if (datos) {
        this.cines = JSON.parse(datos);
      }
    }
    
    /* muestraCine():void{
      this.nuevaVenta.nombre=this.formulario.value.nombre
      this.nuevaVenta.cantidadCompradores=this.formulario.value.cantidadCompradores
      this.nuevaVenta.tarjetaCineco=this.formulario.value.tarjetaCineco
      this.nuevaVenta.cantidadBoletos=this.formulario.value.cantidadBoletos
      this.agregarCine()

      
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
    } */


    muestraCine(): void {
    this.nuevaVenta.nombre = this.formulario.value.nombre;
    this.nuevaVenta.cantidadCompradores = Number(this.formulario.value.cantidadCompradores);
    this.nuevaVenta.tarjetaCineco = this.formulario.value.tarjetaCineco;
    this.nuevaVenta.cantidadBoletos = Number(this.formulario.value.cantidadBoletos);

    if (
      this.nuevaVenta.nombre === '' ||
      this.nuevaVenta.cantidadCompradores <= 0 ||
      this.nuevaVenta.tarjetaCineco === '' ||
      this.nuevaVenta.cantidadBoletos <= 0
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (
      this.nuevaVenta.cantidadBoletos >
      this.nuevaVenta.cantidadCompradores * 7
    ) {
      alert('Maximo 7 boletos por persona');

      this.nuevaVenta.cantidadBoletos = 0;
      this.nuevaVenta.tarjetaCineco = '';
      this.nuevaVenta.nombre = '';
      this.nuevaVenta.cantidadCompradores = 0;

      this.formulario.reset({
        nombre: '',
        cantidadCompradores: 0,
        tarjetaCineco: '',
        cantidadBoletos: 0
      });

      return;
    }

    this.nuevaVenta.valorPagar = this.nuevaVenta.cantidadBoletos * 12;

    if (this.nuevaVenta.cantidadBoletos > 5) {
      this.nuevaVenta.valorPagar = this.nuevaVenta.valorPagar - (this.nuevaVenta.valorPagar * 0.15);
    }
    else if (this.nuevaVenta.cantidadBoletos >= 3) {
      this.nuevaVenta.valorPagar = this.nuevaVenta.valorPagar -
        (this.nuevaVenta.valorPagar * 0.10);
    }

    switch (this.nuevaVenta.tarjetaCineco) {
      case 'si':
        this.nuevaVenta.valorPagar = this.nuevaVenta.valorPagar - (this.nuevaVenta.valorPagar * 0.10);
        break;

      case 'no':
        break;
    }

    this.agregarCine();
  }

  agregarCine(): void {
    this.cines.push({ ...this.nuevaVenta });

    localStorage.setItem(
      'cines',
      JSON.stringify(this.cines)
    );

    alert('Registro guardado correctamente');

    this.nuevaVenta = {
      nombre: '',
      cantidadCompradores: 0,
      tarjetaCineco: '',
      cantidadBoletos: 0,
      valorPagar: 0
    };

    this.formulario.reset({
      nombre: '',
      cantidadCompradores: 0,
      tarjetaCineco: '',
      cantidadBoletos: 0
    });
  }

    
  } 

