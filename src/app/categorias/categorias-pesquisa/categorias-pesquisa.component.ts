import { AuthService } from './../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { CategoriaFiltro, CategoriaService } from '../categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Table } from 'primeng/components/table/table';
import { ToastyService } from 'ng2-toasty';

@Component({
   selector: 'app-categorias-pesquisa',
   templateUrl: './categorias-pesquisa.component.html',
   styleUrls: ['./categorias-pesquisa.component.css']
})
export class CategoriasPesquisaComponent implements OnInit {

   totalRegistros = 0;
   filtro = new CategoriaFiltro();
   categorias = [];
   @ViewChild('tabela', { static: true }) grid: Table;

   constructor(
      private categoriaService: CategoriaService,
      public auth: AuthService,
      private toasty: ToastyService,
      private confirmationService: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Pesquisa de Categorias');
   }

   pesquisar(pagina = 0) {

      this.filtro.pagina = pagina;
      this.categoriaService.pesquisar(this.filtro)
         .then(resultado => {
            this.totalRegistros = resultado.total;
            this.categorias = resultado.categorias;
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
   }

   confirmarExclusao(categoria: any) {
      this.confirmationService.confirm({
         message: 'Tem certeza que deseja excluir registro?',
         accept: () => {
            this.excluir(categoria);
         },
      });
   }

   excluir(categoria: any) {
      this.categoriaService.excluir(categoria.id)
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
