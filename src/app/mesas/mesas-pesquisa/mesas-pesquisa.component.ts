import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { MesaService, MesaFiltro } from './../mesa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/components/table/table';

@Component({
   selector: 'app-mesas-pesquisa',
   templateUrl: './mesas-pesquisa.component.html',
   styleUrls: ['./mesas-pesquisa.component.css']
})

export class MesasPesquisaComponent implements OnInit {

   totalRegistros = 0;
   filtro = new MesaFiltro();
   mesas = [];
   @ViewChild('tabela', { static: true }) grid: Table;

   constructor(
      private mesaService: MesaService,
      public auth: AuthService,
      private toasty: ToastyService,
      private confirmationService: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Pesquisa de Mesas');
   }

   pesquisar(pagina = 0) {
      this.filtro.pagina = pagina;
      this.mesaService.pesquisar(this.filtro)
         .then(resultado => {
            this.totalRegistros = resultado.total;
            this.mesas = resultado.mesas;
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
   }

   confirmarExclusao(mesa: any) {
      this.confirmationService.confirm({
         message: 'Tem certeza que deseja excluir registro?',
         accept: () => {
            this.excluir(mesa);
         },
      });
   }

   excluir(mesa: any) {
      this.mesaService.excluir(mesa.id)
         .then(() => {
            if (this.grid.first === 0) {
               this.pesquisar();
            } else {
               this.grid.reset();
            }
            this.toasty.success('Lançamento excluído com sucesso!');
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

}
