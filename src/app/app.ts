/* import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Zodiaco } from './formularios/zodiaco/zodiaco';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

   
@Component({
  imports: [Zodiaco, FormsModule ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('segundoparcialAngular');
}

export class App implements OnInit {
  protected readonly title = signal('segundoparcialAngular');
  ngOnInit(): void {
    initFlowbite();
  }
} */

import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [ Navbar, RouterOutlet ],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  title = 'web-app'

  ngOnInit(): void {
    initFlowbite();
  }
}


