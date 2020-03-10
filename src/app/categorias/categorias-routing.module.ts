import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
   {
      path: '',
      component: CategoriasPesquisaComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_PESQUISAR_CATEGORIA'] }
   },
   {
      path: 'novo',
      component: CategoriaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_CATEGORIA'] }
   },
   {
      path: ':id',
      component: CategoriaCadastroComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ROLE_CADASTRAR_CATEGORIA'] }
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
export class CategoriasRoutingModule { }
