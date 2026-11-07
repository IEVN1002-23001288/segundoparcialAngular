import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.html',
})
export class Zodiaco {
  nombre:string=''
  Apaterno:string=''
  Amaterno:string=''
  dia:number=0
  mes:number=0
  ano:number=0
  anoActual:number=2026
  zodiaco:string=''
  Sexo:string=''
  resultado:string=''
  imagen:string=''
  imageWidth:number=150
  imageMargin:number=5
  muestraImage:boolean=false

  showImage():void{
    this.muestraImage=!this.muestraImage
  }
  
  calcularZodiaco():void{
    if (this.ano %12==0) {
      this.zodiaco='Mono'
      this.imagen="https://media.istockphoto.com/id/497578552/es/vector/a%C3%B1o-de-los-monos-papercut-arte.jpg?s=612x612&w=0&k=20&c=qyoZXpQy_6YzaQcIwAtdoDc_vJN2oedEr0D1t3i2ulw="

    }
    if (this.ano %12==1) {
      this.zodiaco='Gallo'
      this.imagen="https://media.istockphoto.com/id/600056740/es/vector/a%C3%B1o-del-gallo-papercut.jpg?s=612x612&w=0&k=20&c=RLcBWq9ZVO6v21I9hVd80uumUY6yECd-GdX-2VB39JE="
    }
    if (this.ano %12==2) {
      this.zodiaco='Perro'
      this.imagen="https://media.istockphoto.com/id/866660648/es/vector/a%C3%B1o-del-perro-papercut.jpg?s=612x612&w=0&k=20&c=drOhySk0_t6KIBXajc2NScRyNGhwdnnXXx0LF57uKws="
    }
    if (this.ano %12==3) {
      this.zodiaco='Cerdo'
      this.imagen="https://media.istockphoto.com/id/1039466278/es/vector/a%C3%B1o-del-cerdo-papercut.jpg?s=612x612&w=0&k=20&c=aczAMreEVlIP_55XCJq7pMgYZYJJ5EU5I_53Bn3PLj8="
    }
    if (this.ano %12==4) {
      this.zodiaco='Rata'
      this.imagen="https://media.istockphoto.com/id/1165068831/es/vector/year-of-the-rat-papercut.jpg?s=612x612&w=0&k=20&c=_hG8ejliI1fWNpfN3wcfmw7xx5FGQVGTAlz4TEIIznM="
    }
    if (this.ano %12==5) {
      this.zodiaco='Buey'
      this.imagen="https://media.istockphoto.com/id/1292186443/es/vector/papel-de-buey-de-a%C3%B1o-nuevo.jpg?s=612x612&w=0&k=20&c=nkuAw-gePexYWC-ANxInex1dNdIkc9kMBar5OpeIaLE="
    }
    if (this.ano %12==6) {
      this.zodiaco='Tigre'
      this.imagen="https://media.istockphoto.com/id/1345603683/es/vector/a%C3%B1o-del-tiger-papercut.jpg?s=612x612&w=0&k=20&c=lJAIb2OhOwx9aNdqk7Wt-50164WazBNxxA0GX1ykTCU="
    }
    if (this.ano %12==7) {
      this.zodiaco='Conejo'
      this.imagen="https://media.istockphoto.com/id/483533645/es/vector/a%C3%B1o-de-los-conejos.jpg?s=612x612&w=0&k=20&c=Nf74yZFTRVsHyc08SKQhZ902fRhQTo9teUgWzLYg7Eo="
    }
    if (this.ano %12==8) {
      this.zodiaco='Dragon'
      this.imagen="https://media.istockphoto.com/id/165793472/es/vector/drag%C3%B3n-chino-corte-de-papel-arte.jpg?s=612x612&w=0&k=20&c=bCKfEeU7gBV_2no_JGm7Q5TFISAdzojXyxeeWWV5Ghk="
    }
    if (this.ano %12==9) {
      this.zodiaco='Serpiente'
      this.imagen="https://media.istockphoto.com/id/165930223/es/vector/a%C3%B1o-de-la-serpiente.jpg?s=612x612&w=0&k=20&c=KPbx-vCkDwNB1JCMkGDze2VG_TGLXit4M_u8JAQqOok="

    }
    if (this.ano %12==10) {
      this.zodiaco='Caballo'
      this.imagen="https://media.istockphoto.com/id/2236008249/es/vector/caballo-de-corte-de-papel-a%C3%B1o-del-caballo-2026-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=6tdkfMqYAEM5hVSkP_DaOuqufwb_-lY-KELHOhk3Otk="
    }
    if (this.ano %12==11) {
      this.zodiaco='Cabra'
      this.imagen="https://media.istockphoto.com/id/531034509/es/vector/chinese-goat-new-year-corte-de-papel-arte.jpg?s=612x612&w=0&k=20&c=crbZgDx_Xdi7XdjNxvI_HicBDkiS6kM_anxyTwlwNs4="
    }
    /* this.resultado=`Hola ${this.nombre} ${this.Apaterno} ${this.Amaterno} tienes ${this.anoActual - this.ano} tu signo zodiacal es ${this.zodiaco} ` */
    this.muestraImage = true 
  }

}

