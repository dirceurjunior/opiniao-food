import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { SharedModule } from './../shared/shared.module';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { TableModule } from 'primeng/components/table/table';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { SpinnerModule } from 'primeng/spinner';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';


import { FormsModule } from '@angular/forms';
import { PedidoCadastroComponent } from './pedido-cadastro/pedido-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      PedidoCadastroComponent
   ],
   imports: [
      CommonModule,
      FormsModule,

      InputTextModule,
      ButtonModule,
      TableModule,
      TooltipModule,
      InputMaskModule,
      DataViewModule,
      DropdownModule,
      PanelModule,
      DialogModule,
      CheckboxModule,
      ListboxModule,
      SpinnerModule,
      AccordionModule,
      TabViewModule,
      InputTextareaModule,

      SharedModule,
      PedidosRoutingModule
   ]
})
export class PedidosModule { }
