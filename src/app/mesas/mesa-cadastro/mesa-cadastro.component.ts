import { Mesa } from './../../core/model';
import { MesaService } from './../mesa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
   selector: 'app-mesa-cadastro',
   templateUrl: './mesa-cadastro.component.html',
   styleUrls: ['./mesa-cadastro.component.css']
})
export class MesaCadastroComponent implements OnInit {

   mesa = new Mesa();

   constructor(
      private mesaService: MesaService,
      private toasty: ToastyService,
      private errorHandler: ErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Nova Mesa');
      const idMesa = this.route.snapshot.params['id'];
      if (idMesa) {
         this.carregarMesa(idMesa);
      }
   }

   salvar(form: NgForm) {
      if (this.editando) {
         this.atualizarMesa(form);
      } else {
         this.adicionarMesa(form);
      }
   }

   adicionarMesa(form: NgForm) {
      this.mesaService.adicionar(this.mesa)
         .then(mesaAdicionada => {
            this.toasty.success('Mesa adicionada com sucesso!');
            // this.router.navigate(['/mesas', mesaAdicionada.id]);
            form.reset();
            this.mesa = new Mesa();
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   atualizarMesa(form: NgForm) {
      this.mesaService.atualizar(this.mesa)
         .then(mesa => {
            this.mesa = mesa;
            this.atualizarTituloEdicao();
            this.toasty.success('Mesa alterado com sucesso!');
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   carregarMesa(id: number) {
      this.mesaService.buscarPorId(id)
         .then(mesa => {
            this.mesa = mesa;
            this.atualizarTituloEdicao();
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   get editando() {
      return Boolean(this.mesa.id);
   }

   novo(form: NgForm) {
      form.reset();
      setTimeout(function () {
         this.mesa = new Mesa();
      }.bind(this), 1);
      this.router.navigate(['/mesas/novo']);
   }

   atualizarTituloEdicao() {
      this.title.setTitle(`Edição de mesa: ${this.mesa.numero}`);
   }

}
