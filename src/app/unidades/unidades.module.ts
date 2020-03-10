import { UnidadesRoutingModule } from './unidades-routing.module';
import { SharedModule } from './../shared/shared.module';
import { UnidadesPesquisaComponent } from './unidades-pesquisa/unidades-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeCadastroComponent } from './unidade-cadastro/unidade-cadastro.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';

@NgModule({
   declarations: [
      UnidadeCadastroComponent,
      UnidadesPesquisaComponent
   ],
   imports: [
      CommonModule,
      FormsModule,

      InputTextModule,
      ButtonModule,
      TableModule,
      TooltipModule,
      InputMaskModule,

      SharedModule,
      UnidadesRoutingModule
   ]
})
export class UnidadesModule { }
