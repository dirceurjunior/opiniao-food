import { MesasMovimentoComponent } from './mesas-movimento/mesas-movimento.component';
import { MesasPesquisaComponent } from './mesas-pesquisa/mesas-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesaCadastroComponent } from './mesa-cadastro/mesa-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
   {
      path: '',
      component: MesasPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_MESA'] }
   },
   {
      path: 'movimento',
      component: MesasMovimentoComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_MESA'] }
   },
   {
      path: 'novo',
      component: MesaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_MESA'] }
   },
   {
      path: ':id',
      component: MesaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_MESA'] }
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
export class MesasRoutingModule { }
