import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaestrosUtl } from './MaestrosUtl';

@Injectable({ providedIn: 'root' })
export class ProyectoapiService {
  private readonly url = 'http://127.0.0.1:5000/api/maestros';

  constructor(private http: HttpClient) {}

  getMaestros(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  agregarNuevoMaestro(datos: MaestrosUtl): Observable<any> {
    return this.http.post<any>(this.url + '/', datos);
  }

  getMaestro(matricula: string | number): Observable<any> {
    return this.http.get<any>(`${this.url}/${matricula}`);
  }

  modificarMaestro(matricula: number, datos: MaestrosUtl): Observable<any> {
    return this.http.put<any>(`${this.url}/${matricula}`, datos);
  }

  EliminaMaestro(matricula: string | number): Observable<string> {
    return this.http.delete(`${this.url}/${matricula}`, { responseType: 'text' });
  }
}
