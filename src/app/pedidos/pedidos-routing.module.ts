import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoCadastroComponent } from './pedido-cadastro/pedido-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
   {
      path: '',
      component: PedidoCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_VENDA'] }
   },
   {
      path: 'novo',
      component: PedidoCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_VENDA'] }
   },
   {
      path: ':id',
      component: PedidoCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_VENDA'] }
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
export class PedidosRoutingModule { }
