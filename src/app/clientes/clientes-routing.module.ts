import { NgModule } from '@angular/core';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
   {
      // path: 'clientes',
      path: '',
      component: ClientesPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_CLIENTE'] }
   },
   {
      // path: 'clientes/novo',
      path: 'novo',
      component: ClienteCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_CLIENTE'] }
   },
   {
      // path: 'clientes/:id',
      path: ':id',
      component: ClienteCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_CLIENTE'] }
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
export class ClientesRoutingModule { }
