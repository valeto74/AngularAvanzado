import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from '../usuario/usuario.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class VerificaTokenGuard implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return true;
//   }
// }

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {

    // console.log('Token guard');

    // tslint:disable-next-line:prefer-const
    let token = this._usuarioService.token;
    // tslint:disable-next-line:prefer-const
    let payload = JSON.parse( atob( token.split('.')[1] ));

    // console.log ( payload );
    // tslint:disable-next-line:prefer-const
    let expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }


    return this.verificaRenueva( payload.exp );
  }


  verificaRenueva( fechaExp: number ): Promise<boolean>  {

    return new Promise( (resolve, reject) => {

      // tslint:disable-next-line:prefer-const
      let tokenExp = new Date( fechaExp * 1000 );
      // tslint:disable-next-line:prefer-const
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );

      // console.log( tokenExp );
      // console.log( ahora );

      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else {

        this._usuarioService.renuevaToken()
              .subscribe( () => {
                resolve(true);
              }, () => {
                this.router.navigate(['/login']);
                reject(false);
              });

      }

    });

  }


  expirado( fechaExp: number ) {

    // tslint:disable-next-line:prefer-const
    let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }


  }



}

