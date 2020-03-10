import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { ProdutoService, ProdutoFiltro } from './../produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/components/table/table';

@Component({
   selector: 'app-produtos-pesquisa',
   templateUrl: './produtos-pesquisa.component.html',
   styleUrls: ['./produtos-pesquisa.component.css']
})
export class ProdutosPesquisaComponent implements OnInit {

   totalRegistros = 0;
   filtro = new ProdutoFiltro();
   produtos = [];
   @ViewChild('tabela', { static: true }) grid: Table;

   constructor(
      private produtoService: ProdutoService,
      public auth: AuthService,
      private toasty: ToastyService,
      private confirmationService: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Pesquisa de Produtos');
   }

   pesquisar(pagina = 0) {
      this.filtro.pagina = pagina;
      this.produtoService.pesquisar(this.filtro)
         .then(resultado => {
            this.totalRegistros = resultado.total;
            this.produtos = resultado.produtos;
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
   }

   confirmarExclusao(produto: any) {
      this.confirmationService.confirm({
         message: 'Tem certeza que deseja excluir registro?',
         accept: () => {
            this.excluir(produto);
         },
      });
   }

   excluir(produto: any) {
      this.produtoService.excluir(produto.id)
         .then(() => {
            if (this.grid.first === 0) {
               this.pesquisar();
            } else {
               this.grid.reset();
            }
            this.toasty.success('Produto excluído com sucesso!');
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

}
