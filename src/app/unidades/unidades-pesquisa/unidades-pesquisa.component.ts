import { ErrorHandlerService } from './../../core/error-handler.service';
import { UnidadeFiltro, UnidadeService } from './../unidade.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/components/table/table';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';

@Component({
   selector: 'app-unidades-pesquisa',
   templateUrl: './unidades-pesquisa.component.html',
   styleUrls: ['./unidades-pesquisa.component.css']
})
export class UnidadesPesquisaComponent implements OnInit {

   totalRegistros = 0;
   filtro = new UnidadeFiltro();
   unidades = [];
   @ViewChild('tabela', { static: true }) grid: Table;

   constructor(
      private unidadeService: UnidadeService,
      private toasty: ToastyService,
      private confirmationService: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Pesquisa de Unidades');
   }

   pesquisar(pagina = 0) {
      this.filtro.pagina = pagina;
      this.unidadeService.pesquisar(this.filtro)
         .then(resultado => {
            this.totalRegistros = resultado.total;
            this.unidades = resultado.unidades;
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
   }

   confirmarExclusao(unidade: any) {
      this.confirmationService.confirm({
         message: 'Tem certeza que deseja excluir registro?',
         accept: () => {
            this.excluir(unidade);
         },
      });
   }

   excluir(unidade: any) {
      this.unidadeService.excluir(unidade.id)
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
