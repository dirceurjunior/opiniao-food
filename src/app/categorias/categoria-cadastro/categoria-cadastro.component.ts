import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { CategoriaService } from './../../categorias/categoria.service';
import { Categoria } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-categoria-cadastro',
   templateUrl: './categoria-cadastro.component.html',
   styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

   categoria = new Categoria();

   constructor(
      private categoriaService: CategoriaService,
      private toasty: ToastyService,
      private errorHandler: ErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Nova Categoria');
      const idCategoria = this.route.snapshot.params['id'];
      if (idCategoria) {
         this.carregarCategoria(idCategoria);
      }
   }

   salvar(form: NgForm) {
      if (this.editando) {
         this.atualizarCategoria(form);
      } else {
         this.adicionarCategoria(form);
      }
   }

   adicionarCategoria(form: NgForm) {
      this.categoriaService.adicionar(this.categoria)
         .then(categoriaAdicionada => {
            this.toasty.success('Categoria adicionada com sucesso!');
            this.router.navigate(['/categorias', categoriaAdicionada.id]);
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   atualizarCategoria(form: NgForm) {
      this.categoriaService.atualizar(this.categoria)
         .then(categoria => {
            this.categoria = categoria;
            this.atualizarTituloEdicao();
            this.toasty.success('Categoria alterado com sucesso!');
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   carregarCategoria(id: number) {
      this.categoriaService.buscarPorId(id)
         .then(categoria => {
            this.categoria = categoria;
            this.atualizarTituloEdicao();
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   get editando() {
      return Boolean(this.categoria.id);
   }

   novo(form: NgForm) {
      form.reset();
      setTimeout(function () {
         this.categoria = new Categoria();
      }.bind(this), 1);
      this.router.navigate(['/categorias/novo']);
   }

   atualizarTituloEdicao() {
      this.title.setTitle(`Edição de categoria: ${this.categoria.descricao}`);
   }

}
