import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/users';
import { DataLoginService } from 'src/app/services/data-login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  email: string = ''; // Agregamos estas propiedades
  password: string = ''; // Agregamos estas propiedades
  loading: boolean = false;
  

  constructor(
    private dataLoginService: DataLoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Crea el formulario reactivo con validadores
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    // Validar si el formulario es válido antes de proceder
    if (this.loginForm.invalid) {
      this.dataLoginService.error('Por favor, completa todos los campos correctamente', 'Error');
      return;
    }

    // Obtén los valores del formulario
    const { email, password } = this.loginForm.value;

    // Creamos el objeto de usuario
    const user: Usuario = {
      email: email,
      password: password,
      nombre: ''
    };

    this.loading = true;
    // Supongamos que tienes un servicio llamado _userService con un método login
    this.dataLoginService.loginUser(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this.dataLoginService.msjError(e);
        this.loading = false;
      }
    });
  }
}
