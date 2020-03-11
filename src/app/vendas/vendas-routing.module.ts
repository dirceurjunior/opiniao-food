import { VendaCadastroComponent } from './venda-cadastro/venda-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
   {
      path: '',
      component: VendaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_VENDA'] }
   },
   {
      path: 'novo',
      component: VendaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_VENDA'] }
   },
   {
      path: ':id',
      component: VendaCadastroComponent,
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
export class VendasRoutingModule { }
