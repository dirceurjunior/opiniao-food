
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [

   // {
   //    path: 'mesa-movimentos', loadChildren: () => import('./mesa-movimentos/mesa-movimentos.module')
   //       .then(m => m.MesaMovimentosModule)
   // },

   { path: 'vendas', loadChildren: () => import('./vendas/vendas.module').then(m => m.VendasModule) },
   { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule) },
   { path: 'produtos', loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule) },
   { path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule) },
   { path: 'unidades', loadChildren: () => import('./unidades/unidades.module').then(m => m.UnidadesModule) },
   { path: 'mesas', loadChildren: () => import('./mesas/mesas.module').then(m => m.MesasModule) },

   { path: '', redirectTo: '/mesas/movimento', pathMatch: 'full' },
   { path: 'nao-autorizado', component: NaoAutorizadoComponent },
   { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
   { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [
      RouterModule,
   ]
})
export class AppRoutingModule { }
