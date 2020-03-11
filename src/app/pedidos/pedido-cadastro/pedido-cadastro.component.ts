import { Table } from 'primeng/components/table/table';
import { MesaService } from './../../mesas/mesa.service';
import { ProdutoService, ProdutoFiltro } from './../../produtos/produto.service';
import { PedidoService } from './../pedido.service';
import { NgForm } from '@angular/forms';
import { Pedido, Produto, Mesa, Pedido_Item } from './../../core/model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
   selector: 'app-pedido-cadastro',
   templateUrl: './pedido-cadastro.component.html',
   styleUrls: ['./pedido-cadastro.component.css']
})
export class PedidoCadastroComponent implements OnInit {

   categorias = [];

   produtos: [];

   mesas: [];

   filtroProduto = new ProdutoFiltro();

   categoriaEscolhida: string;

   sortField: string;

   sortOrder: number;

   displayDialog: boolean;

   pedido = new Pedido();

   mesa = new Mesa();

   produto = new Produto();

   item = new Pedido_Item();

   ingredientesSelecionados: Produto[];

   ingredientes: Produto[];

   quantidade = 1;

   @ViewChild('tabela', { static: true }) grid: Table;

   constructor(
      private categoriaService: CategoriaService,
      private produtoService: ProdutoService,
      private mesaService: MesaService,
      private pedidoService: PedidoService,
      private toasty: ToastyService,
      private errorHandler: ErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Novo Pedido');
      const idMesa = this.route.snapshot.params['id'];
      if (idMesa) {
         this.carregarMesas(idMesa);
      } else { }
      this.carregarMesas(idMesa);
      this.carregarCategorias();
   }

   salvar() {
      if (this.editando) {
         this.atualizarPedido();
      } else {
         console.log('adicionando pedido');
         this.adicionarPedido();
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
      this.pedido.dataCriacao = new Date();
      this.pedido.dataVenda = new Date();
      this.pedido.itens.push(this.item);
      this.pedido.cliente.id = 1;
      event.preventDefault();
      console.log(this.pedido);
      if (this.pedido.id) {
         this.atualizarPedido();
      } else {
         this.adicionarPedido();
      }
      this.quantidade = 1;
      this.displayDialog = false;
   }

   editarProdutoPedido(event: Event, produtoSelecionado: Produto) {
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

   adicionarPedido() {
      console.log('adicionando pedido');
      this.pedidoService.adicionar(this.pedido)
         .then(pedidoAdicionado => {
            this.pedido = pedidoAdicionado;
            this.toasty.success('Pedido adicionado com sucesso!');
            this.router.navigate(['/pedidos', pedidoAdicionado.id]);
            console.log(this.pedido);
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   atualizarPedido() {
      console.log('atualizando pedido');
      this.pedidoService.atualizar(this.pedido)
         .then(novoPedido => {
            this.pedido = novoPedido;
            this.atualizarTituloEdicao();
            this.toasty.success('Pedido alterado com sucesso!');
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
            this.pedido.mesa = resultado;
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

   carregarPedido(id: number) {
      this.pedidoService.buscarPorId(id)
         .then(pedido => {
            this.pedido = pedido;
            this.atualizarTituloEdicao();
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   get editando() {
      return Boolean(this.pedido.id);
   }

   novo(form: NgForm) {
      form.reset();
      setTimeout(function () {
         this.pedido = new Pedido();
      }.bind(this), 1);
      this.router.navigate(['/pedidos/novo']);
   }

   atualizarTituloEdicao() {
      this.title.setTitle(`Edição de pedido: ${this.pedido.mesa}`);
   }

}
