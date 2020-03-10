import { Cliente } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ClienteService } from './../cliente.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
   selector: 'app-cliente-cadastro',
   templateUrl: './cliente-cadastro.component.html',
   styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

   tipoPessoa = [
      { label: 'Física', value: 'FISICA' },
      { label: 'Jurídica', value: 'JURIDICA' }
   ];

   tipoSituacao = [
      { label: 'Ativa', value: 'ATIVO' },
      { label: 'Inativo', value: 'INATIVO' }
   ];

   cliente = new Cliente();

   constructor(
      private clienteService: ClienteService,
      private toasty: ToastyService,
      private errorHandler: ErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
   ) { }

   ngOnInit() {
      this.title.setTitle('Novo lançamento');
      const idCliente = this.route.snapshot.params['id'];
      if (idCliente) {
         this.carregarCliente(idCliente);
      }
   }

   salvar(form: NgForm) {
      if (this.editando) {
         this.atualizarCliente(form);
      } else {
         this.adicionarCliente(form);
      }
   }

   adicionarCliente(form: NgForm) {
      this.clienteService.adicionar(this.cliente)
         .then(clienteAdicionado => {
            this.toasty.success('Cliente adicionado com sucesso!');
            this.router.navigate(['/clientes', clienteAdicionado.id]);
            // form.reset();
            // this.cliente = new Cliente();
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   atualizarCliente(form: NgForm) {
      this.clienteService.atualizar(this.cliente)
         .then(cliente => {
            this.cliente = cliente;
            this.atualizarTituloEdicao();
            this.toasty.success('Cliente alterado com sucesso!');
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   carregarCliente(id: number) {
      this.clienteService.buscarPorId(id)
         .then(cliente => {
            this.cliente = cliente;
            this.atualizarTituloEdicao();
         })
         .catch(erro => this.errorHandler.handle(erro));
   }

   get editando() {
      return Boolean(this.cliente.id);
   }

   novo(form: NgForm) {
      form.reset();
      setTimeout(function () {
         this.cliente = new Cliente();
      }.bind(this), 1);
      this.router.navigate(['/clientes/novo']);
   }

   atualizarTituloEdicao() {
      this.title.setTitle(`Edição de lançamento: ${this.cliente.nomeRazaoSocial}`);
   }


}
