import { ErrorHandlerService } from './../../core/error-handler.service';
import { UnidadeService } from './../../unidades/unidade.service';
import { ProdutoService, ProdutoFiltro } from './../produto.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Produto } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SelectItem } from 'primeng/components/common/api';

@Component({
   selector: 'app-produto-cadastro',
   templateUrl: './produto-cadastro.component.html',
   styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

   situacoes = [
      { label: 'Ativo', value: 'ATIVO' },
      { label: 'Inativo', value: 'INATIVO' }
   ];

   simNao = [
      { label: 'Sim', value: 'SIM' },
      { label: 'Não', value: 'NAO' }
   ];

   categorias = [];

   unidades = [];

   produto = new Produto();

   filtro = new ProdutoFiltro();

   ingredientesSelecionados: string[] = [];

   listaDeIngredientes: SelectItem[];

   constructor(
      private categoriaService: CategoriaService,
      private produtoService: ProdutoService,
      private toasty: ToastyService,
      private unidadeService: UnidadeService,
      private errorHandler: ErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Novo Produto');
      const idProduto = this.route.snapshot.params['id'];
      if (idProduto) {
         this.carregarProduto(idProduto);
      } else {
      }
      this.carregarCategorias();
      this.carregarUnidades();
      this.carregarIngredientes();
   }

   salvar(form: NgForm) {
      const prod = { ...this.produto };
      if (this.ingredientesSelecionados) {
         prod.ingredientes = this.ingredientesSelecionados.map(itemId => {
            return { id: itemId };
         });
      }
      if (this.editando) {
         this.atualizarProduto(prod);
      } else {
         this.adicionarProduto(prod);
      }
   }

   adicionarProduto(produto: Produto) {
      this.produtoService.adicionar(produto)
         .then(produtoAdicionado => {
            this.toasty.success('Produto adicionado com sucesso!');
            this.router.navigate(['/produtos', produtoAdicionado.id]);
            // form.reset();
            // this.produto = new Produto();
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   atualizarProduto(produto: Produto) {
      this.produtoService.atualizar(produto)
         .then(novoProduto => {
            this.produto = novoProduto;
            this.atualizarTituloEdicao();
            this.toasty.success('Produto alterado com sucesso!');
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

   carregarUnidades() {
      this.unidadeService.listarTodas()
         .then(unidades => {
            this.unidades = unidades.content.map(u => {
               return { label: u.descricao, value: u.id };
            });
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   pegaItem(id) {
      if (this.listaDeIngredientes && id) {
         const ingrediente = this.listaDeIngredientes.find(item => item.value === id);
         return ingrediente ? ingrediente.label : '';
      }
   }


   carregarProduto(id: number) {
      console.log('entrou metodo carregarProduto');
      this.produtoService.buscarPorId(id)
         .then(produto => {
            this.produto = produto;
            this.ingredientesSelecionados = this.produto.ingredientes.map(ingrediente => {
               return ingrediente.id;
            });
            this.atualizarTituloEdicao();
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   carregarIngredientes() {
      console.log('entrou metodo carregarIngredientes');
      this.filtro.itensPorPagina = 0;
      this.filtro.categoria = 6;
      this.produtoService.pesquisar(this.filtro)
         .then(ingredientes => {
            this.listaDeIngredientes = ingredientes.produtos.map(i => {
               return { label: i.nome, value: i.id };
            });
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   get editando() {
      return Boolean(this.produto.id);
   }

   novo(form: NgForm) {
      form.reset();
      setTimeout(function () {
         this.produto = new Produto();
      }.bind(this), 1);
      this.router.navigate(['/produtos/novo']);
   }

   atualizarTituloEdicao() {
      this.title.setTitle(`Edição de produto: ${this.produto.nome}`);
   }

}
