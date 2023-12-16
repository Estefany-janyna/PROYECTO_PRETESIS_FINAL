import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/models/users';
import { DataLoginService } from 'src/app/services/data-login.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private dataLoginService: DataLoginService,
    private router: Router
  ) {}

  addUser() {
    // Validamos que el usuario ingrese valores
    if (this.nombre === '' || this.email === '' || this.password === '' || this.confirmPassword === '') {
      this.dataLoginService.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validamos que las contraseñas sean iguales
    if (this.password !== this.confirmPassword) {
      this.dataLoginService.error('Las contraseñas ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto de usuario
    const user: Usuario = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.loading = true;
    this.dataLoginService.createUser(user).subscribe({
      next: (response) => {
        this.loading = false;
        this.dataLoginService.success(`El usuario ${this.nombre} fue registrado con éxito`, 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.dataLoginService.error('Hubo un error al registrar el usuario', 'Error');
        console.error(error);
      }
    });
  }
}
