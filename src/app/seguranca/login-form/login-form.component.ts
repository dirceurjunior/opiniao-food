import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-login-form',
   templateUrl: './login-form.component.html',
   styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

   constructor(
      public auth: AuthService,
      private errorHandler: ErrorHandlerService,
      private router: Router
   ) { }

   ngOnInit() {
   }

   login(usuario: string, senha: string) {
      this.auth.login(usuario, senha)
         .then(() => {
            this.router.navigate(['/mesas/movimento']);
         })
         .catch(erro => {
            this.errorHandler.handle(erro);
         });
   }

}
