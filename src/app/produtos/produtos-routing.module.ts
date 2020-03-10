import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
   {
      path: '',
      component: ProdutosPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_PRODUTO'] }
   },
   {
      path: 'novo',
      component: ProdutoCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_PRODUTO'] }
   },
   {
      path: ':id',
      component: ProdutoCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_PRODUTO'] }
   }
];


@NgModule({
   imports: [
      RouterModule.forChild(routes),
   ],
   exports: [
      RouterModule,
   ]
})
export class ProdutosRoutingModule { }
