import { UnidadesPesquisaComponent } from './unidades-pesquisa/unidades-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadeCadastroComponent } from './unidade-cadastro/unidade-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
   {
      path: '',
      component: UnidadesPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_PRODUTO'] }
   },
   {
      path: 'novo',
      component: UnidadeCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_PRODUTO'] }
   },
   {
      path: ':id',
      component: UnidadeCadastroComponent,
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
export class UnidadesRoutingModule { }
