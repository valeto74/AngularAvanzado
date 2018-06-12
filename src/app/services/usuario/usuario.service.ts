import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    // console.log('Servicio de usuario listo');
    this.cargarStorage();

   }

   estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }


  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }


   guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } ).pipe(
                map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario );
                  return true;
                }));


  }

   login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario ).pipe(
                map( (resp: any) => {

                  this.guardarStorage( resp.id, resp.token, resp.usuario );

                  return true;
                }));

  }

   crearUsuario( usuario: Usuario ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICIOS + '/usuario';

    // return this.http.post( url, usuario );

    return this.http.post( url, usuario ).pipe(
              map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              }));
  }



}
