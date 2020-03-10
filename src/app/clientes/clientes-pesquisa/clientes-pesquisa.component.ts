import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { ClienteService, ClienteFiltro } from './../cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/components/table/table';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';

@Component({
   selector: 'app-clientes-pesquisa',
   templateUrl: './clientes-pesquisa.component.html',
   styleUrls: ['./clientes-pesquisa.component.css']
})
export class ClientesPesquisaComponent implements OnInit {

   totalRegistros = 0;
   filtro = new ClienteFiltro();
   clientes = [];
   @ViewChild('tabela', { static: true }) grid: Table;

   constructor(
      private clienteService: ClienteService,
      public auth: AuthService,
      private toasty: ToastyService,
      private confirmationService: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Pesquisa de Clientes');
   }

   pesquisar(pagina = 0) {
      this.filtro.pagina = pagina;
      this.clienteService.pesquisar(this.filtro)
         .then(resultado => {
            this.totalRegistros = resultado.total;
            this.clientes = resultado.clientes;
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
   }

   confirmarExclusao(cliente: any) {
      this.confirmationService.confirm({
         message: 'Tem certeza que deseja excluir registro?',
         accept: () => {
            this.excluir(cliente);
         },
      });
   }

   excluir(cliente: any) {
      this.clienteService.excluir(cliente.id)
         .then(() => {
            if (this.grid.first === 0) {
               this.pesquisar();
            } else {
               this.grid.reset();
            }
            this.toasty.success('Cliente excluído com sucesso!');
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

}
