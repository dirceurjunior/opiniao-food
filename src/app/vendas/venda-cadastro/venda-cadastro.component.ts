import { Table } from 'primeng/components/table/table';
import { MesaService } from '../../mesas/mesa.service';
import { ProdutoService, ProdutoFiltro } from '../../produtos/produto.service';
import { VendaService } from './../venda.service';
import { NgForm } from '@angular/forms';
import { Venda, Produto, Mesa, Venda_Item } from '../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { CategoriaService } from '../../categorias/categoria.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
   selector: 'app-venda-cadastro',
   templateUrl: './venda-cadastro.component.html',
   styleUrls: ['./venda-cadastro.component.css']
})
export class VendaCadastroComponent implements OnInit {

   categorias = [];

   produtos: [];

   mesas: [];

   filtroProduto = new ProdutoFiltro();

   categoriaEscolhida: string;

   sortField: string;

   sortOrder: number;

   displayDialog: boolean;

   venda = new Venda();

   mesa = new Mesa();

   produto = new Produto();

   item = new Venda_Item();

   ingredientesSelecionados: Produto[];

   ingredientes: Produto[];

   ingredientesAdicionais: Produto[];

   quantidade = 1;

   @ViewChild('tabela', { static: true }) grid: Table;

   constructor(
      private categoriaService: CategoriaService,
      private produtoService: ProdutoService,
      private mesaService: MesaService,
      private vendaService: VendaService,
      private toasty: ToastyService,
      private errorHandler: ErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Novo Venda');
      const idMesa = this.route.snapshot.params['id'];
      if (idMesa) {
         this.carregarMesas(idMesa);
      } else { }
      this.carregarMesas(idMesa);
      this.carregarCategorias();
   }

   salvar() {
      if (this.editando) {
         this.atualizarVenda();
      } else {
         console.log('adicionando venda');
         this.adicionarVenda();
      }
   }

   adicionarProduto(event: Event, produtoSelecionado: Produto) {
      // console.log(produtoSelecionado);
      this.item.produto = produtoSelecionado;
      // console.log(this.item.produto);
      this.item.produto.ingredientes = this.ingredientesSelecionados;
      // console.log(this.item.produto);
      this.item.quantidade = this.quantidade;
      this.item.valorUnitarioSemDesconto = produtoSelecionado.valorUnitario;
      // console.log(this.item);
      this.venda.dataCriacao = new Date();
      this.venda.dataVenda = new Date();
      this.venda.itens.push(this.item);
      this.venda.cliente.id = 1;
      event.preventDefault();
      console.log(this.venda);
      if (this.venda.id) {
         this.atualizarVenda();
      } else {
         this.adicionarVenda();
      }
      this.quantidade = 1;
      this.displayDialog = false;
   }

   editarProdutoVenda(event: Event, produtoSelecionado: Produto) {
      this.produtoService.buscarPorId(produtoSelecionado.id)
         .then(produto => {
            this.produto = produto;
            this.ingredientes = this.produto.ingredientes.map(ingrediente => {
               return ingrediente;
            });
            this.ingredientesSelecionados = this.ingredientes;
            this.atualizarTituloEdicao();
         })
         .catch(erro => this.errorHandler.handle(erro));

      this.displayDialog = true;
      event.preventDefault();
   }

   adicionarVenda() {
      console.log('adicionando venda');
      this.vendaService.adicionar(this.venda)
         .then(vendaAdicionado => {
            this.venda = vendaAdicionado;
            this.toasty.success('Venda adicionado com sucesso!');
            this.router.navigate(['/vendas', vendaAdicionado.id]);
            console.log(this.venda);
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   atualizarVenda() {
      console.log('atualizando venda');
      this.vendaService.atualizar(this.venda)
         .then(novoVenda => {
            this.venda = novoVenda;
            this.atualizarTituloEdicao();
            this.toasty.success('Venda alterado com sucesso!');
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   carregarCategorias() {
      return this.categoriaService.listarTodas()
         .then(categorias => {
            this.categorias = categorias.content.map(c => {
               return { label: c.descricao, value: c.id };
            });
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   carregarMesas(id: number) {
      this.mesaService.buscarPorId(id)
         .then(resultado => {
            this.venda.mesa = resultado;
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   carregarProdutos(event) {
      this.filtroProduto.categoria = event.value;
      this.filtroProduto.itensPorPagina = 0;
      return this.produtoService.pesquisar(this.filtroProduto)
         .then(resultado => {
            this.produtos = resultado.produtos;
            console.log(this.produtos);
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   carregarVenda(id: number) {
      this.vendaService.buscarPorId(id)
         .then(venda => {
            this.venda = venda;
            this.atualizarTituloEdicao();
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   get editando() {
      return Boolean(this.venda.id);
   }

   novo(form: NgForm) {
      form.reset();
      setTimeout(function () {
         this.venda = new Venda();
      }.bind(this), 1);
      this.router.navigate(['/vendas/novo']);
   }

   atualizarTituloEdicao() {
      this.title.setTitle(`Edição de venda: ${this.venda.mesa}`);
   }

}
