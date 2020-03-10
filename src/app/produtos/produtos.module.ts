import { ProdutosRoutingModule } from './produtos-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
   declarations: [
      ProdutoCadastroComponent,
      ProdutosPesquisaComponent
   ],
   exports: [],
   imports: [
      CommonModule,
      FormsModule,

      InputTextModule,
      ButtonModule,
      TableModule,
      TooltipModule,
      InputTextareaModule,
      CalendarModule,
      SelectButtonModule,
      DropdownModule,
      CurrencyMaskModule,
      MultiSelectModule,

      SharedModule,
      ProdutosRoutingModule
   ]
})
export class ProdutosModule { }
