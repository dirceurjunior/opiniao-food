import { ErrorHandlerService } from './../error-handler.service';
import { Router } from '@angular/router';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-navbar',
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   exibindoMenu = false;

   constructor(
      public auth: AuthService,
      private router: Router,
      private errorHandler: ErrorHandlerService,
   ) { }

   ngOnInit() {
   }

   criarNovoAcessToken() {
      this.auth.obterNovoAccessToken();
   }

   logout() {
      this.auth.logout();
      this.router.navigate(['/login']);
   }

}
