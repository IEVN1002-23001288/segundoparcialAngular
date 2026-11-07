import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlumnosUtl } from './AlumnosUtl';

@Injectable({ providedIn: 'root' })
export class ProyectoapiService {
  private readonly url = 'http://127.0.0.1:5000/api/alumnos';

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  agregarNuevoAlumno(datos: AlumnosUtl): Observable<any> {
    return this.http.post<any>(this.url + '/', datos);
  }

  getAlumno(matricula: string | number): Observable<any> {
    return this.http.get<any>(`${this.url}/${matricula}`);
  }

  modificarAlumno(matricula: number, datos: AlumnosUtl): Observable<any> {
    return this.http.put<any>(`${this.url}/${matricula}`, datos);
  }

  EliminaAlumno(matricula: string | number): Observable<string> {
    return this.http.delete(`${this.url}/${matricula}`, { responseType: 'text' });
  }
}
