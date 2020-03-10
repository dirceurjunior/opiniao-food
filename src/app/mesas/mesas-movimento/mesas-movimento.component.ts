import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { MesaService } from './../mesa.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';

@Component({
   selector: 'app-mesas-movimento',
   templateUrl: './mesas-movimento.component.html',
   styleUrls: ['./mesas-movimento.component.css']
})
export class MesasMovimentoComponent implements OnInit {

   mesas = [];

   constructor(
      private mesaService: MesaService,
      public auth: AuthService,
      private toasty: ToastyService,
      private confirmationService: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      private title: Title
   ) { }

   ngOnInit() {
      this.carregarMesas();
   }

   carregarMesas() {
      this.mesaService.listarTodas()
         .then(mesas => {
            this.mesas = mesas.content;
            console.log(this.mesas);
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

}
