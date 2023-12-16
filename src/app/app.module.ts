import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/users/login/login.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { AprenderComponent } from './pages/navbar/elements/aprender/aprender.component';

import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    ListarProductosComponent,
    CrearProductosComponent,
    NavbarComponent,
    EditarProductosComponent,
    AprenderComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
