import { MoneyHttpInterceptor } from './../seguranca/money-http-interceptor';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

import { AuthService } from './../seguranca/auth.service';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyModule } from 'ng2-toasty';
import { ErrorHandlerService } from './error-handler.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';

@NgModule({
   declarations: [
      NavbarComponent,
      PaginaNaoEncontradaComponent,
      NaoAutorizadoComponent
   ],
   exports: [
      NavbarComponent,
      ToastyModule,
      ConfirmDialogModule
   ],
   imports: [
      CommonModule,
      RouterModule,
      ToastyModule.forRoot(),
      ConfirmDialogModule
   ],
   providers: [
      ErrorHandlerService,
      AuthService,
      ConfirmationService,
      JwtHelperService,
      Title,
      MoneyHttpInterceptor,

      { provide: LOCALE_ID, useValue: 'pt-BR' },
   ]
})
export class CoreModule { }
