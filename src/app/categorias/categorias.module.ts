import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { TableModule } from 'primeng/components/table/table';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { SharedModule } from './../shared/shared.module';

import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';

@NgModule({
   declarations: [
      CategoriasPesquisaComponent,
      CategoriaCadastroComponent
   ],
   exports: [],
   imports: [
      CommonModule,
      FormsModule,

      InputTextModule,
      ButtonModule,
      TableModule,
      TooltipModule,
      InputMaskModule,

      SharedModule,
      CategoriasRoutingModule
   ]
})
export class CategoriasModule { }
