// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataLoginService {
  private apiUrl = 'http://localhost:4000/api/usuarios';

  constructor(private http: HttpClient) {}

  createUser(user: Usuario): Observable<any> {
    const url = `${this.apiUrl}/create-user`;
    return this.http.post(url, user);
  }

  loginUser(credentials: Usuario): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, credentials);
  }

  error(message: string, title: string): void {
    // Puedes personalizar la lógica para manejar errores aquí
    console.error(`Error: ${title} - ${message}`);
  }

  msjError(error: HttpErrorResponse): void {
    // Puedes personalizar la lógica para manejar errores aquí
    console.error('Hubo un error:', error);
  }

  success(message: string, title: string): void {
    // Puedes personalizar la lógica para manejar éxitos aquí
    console.log(`Success: ${title} - ${message}`);
  }
}
