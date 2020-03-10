import { NgModule } from '@angular/core';
import { MesasRoutingModule } from './mesas-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MesasPesquisaComponent } from './mesas-pesquisa/mesas-pesquisa.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MesaCadastroComponent } from './mesa-cadastro/mesa-cadastro.component';
import { MesasMovimentoComponent } from './mesas-movimento/mesas-movimento.component';

@NgModule({
   declarations: [
      MesasPesquisaComponent,
      MesaCadastroComponent,
      MesasMovimentoComponent
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
      CardModule,

      SharedModule,
      MesasRoutingModule
   ]
})
export class MesasModule { }
