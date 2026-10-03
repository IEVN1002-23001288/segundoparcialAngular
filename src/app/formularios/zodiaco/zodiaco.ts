import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  imports: [FormsModule],
  templateUrl: './zodiaco.html',
})
export class Zodiaco {

  nom:string=''
  apa:string=''
  ama:string=''
  dia:number=0
  mes:number=0
  ano:number=0
  res1:string=''
  res2:number=0
  res3:string=''

  imagen:string=''

  tipo():void{
    this.res1 = `Hola ${this.nom} ${this.apa} ${this.ama}`
    this.res2 = 2026 - this.ano

    switch (this.ano % 12) {
      
      case 0:
        this.res3 = 'Mono'
        this.imagen = 'https://ferrebeekeeper.wordpress.com/wp-content/uploads/2016/02/monk-2.jpg'
        break
    
      case 1:
        this.res3 = 'Gallo'
        this.imagen = 'https://assets.wemystic.com/wmcom/2018/10/horoscopo-chino-gallo.jpg'
        break
    
      case 2:
        this.res3 = 'Perro'
        this.imagen = 'https://tse3.mm.bing.net/th/id/OIP.uQaD2X3EYIL9vXBJhv8zkAHaHa?r=0&w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3'
        break
    
      case 3:
        this.res3 = 'Cerdo'
        this.imagen = 'https://heraldodemexico.com.mx/u/fotografias/m/2021/12/27/f768x1-459388_459515_79.jpeg'
        break

      case 4:
        this.res3 = 'Rata'
        this.imagen = 'https://th.bing.com/th/id/R.d6f3c66ce2a6c4ff215655cd36791f03?rik=u4DEF27kmm7z3A&pid=ImgRaw&r=0'
        break

      case 5:
        this.res3 = 'Buey'
        this.imagen = 'https://peopleenespanol.com/thmb/ia0u33jxk7_bfFTLf1viDW9j5LA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/horoscopo-chino-buey-de-metal-2021-e93c7ebe89ab4c0daa8704d6e4a827dd.png'
        break
        
      case 6:
        this.res3 = 'Tigre'
        this.imagen = 'https://static.vecteezy.com/system/resources/previews/024/098/426/large_2x/tiger-chinese-zodiac-emblem-free-png.png'
        break

      case 7:
        this.res3 = 'Conejo'
        this.imagen = 'https://tse1.mm.bing.net/th/id/OIP.c1EQshwngk7JPRmpdQQhKwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
        break

      case 8:
        this.res3 = 'Dragón'
        this.imagen = 'https://tse4.mm.bing.net/th/id/OIP.KD22oAMBV5jNcB9iAhmEUQHaHa?r=0&w=512&h=512&rs=1&pid=ImgDetMain&o=7&rm=3'
        break

      case 9:
        this.res3 = 'Serpiente'
        this.imagen = 'https://tse4.mm.bing.net/th/id/OIP.yg-9aYH9Hd6umCYe_o0yQAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
        break

      case 10:
        this.res3 = 'Caballo'
        this.imagen = 'https://media.istockphoto.com/id/459360553/id/vektor/tahun-seni-potong-kertas-kuda.jpg?s=170667a&w=0&k=20&c=dlUVdRjXgzxLsStQLDvgkY0GSvzgU1bGDP-5OSNuMyc='
        break

      case 11:
        this.res3 = 'Cabra'
        this.imagen = 'https://img.freepik.com/vector-premium/horoscopo-chino-simbolo-cabra-ano-nuevo-lunar-silueta-cabra-oriental-calendario-astrologico-zodiaco-signo-cabra-ilustracion-vectorial-plana-icono-horoscopo-tradicional_627510-4765.jpg'
        break

    }
  }
}