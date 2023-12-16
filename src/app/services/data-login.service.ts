import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class DataLoginService {
  url = 'http://localhost:4000/api/usuarios/';


  nombreUsuario: string = 'Estefany Taipe'

  constructor(private http: HttpClient) { 

  }

  

}
