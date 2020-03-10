import { Pedido } from '../core/model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class PedidoFiltro {
   nome: string;
   // dataVencimentoInicio: Date;
   // dataVencimentoFim: Date;
   pagina = 0;
   itensPorPagina = 50;
}

@Injectable({
   providedIn: 'root'
})
export class PedidoService {

   pedidosUrl: string;

   constructor(private http: HttpClient) {
      this.pedidosUrl = `${environment.apiUrl}/vendas`;
   }

   pesquisar(filtro: PedidoFiltro): Promise<any> {
      let params = new HttpParams();
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
      // if (filtro.nome) {
      //    params = params.set('nome', filtro.nome);
      // }
      return this.http.get(`${this.pedidosUrl}?resumo`, { params })
         .toPromise()
         .then(response => {
            const pedidos = response['content'];
            const resultado = {
               pedidos,
               total: response['totalElements']
            };
            return resultado;
         });
   }

   excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.pedidosUrl}/${codigo}`)
         .toPromise()
         .then(() => null);
   }

   adicionar(pedido: Pedido): Promise<Pedido> {
      return this.http.post<Pedido>(this.pedidosUrl, pedido)
         .toPromise();
   }

   atualizar(pedido: Pedido): Promise<Pedido> {
      return this.http.put(`${this.pedidosUrl}/${pedido.id}`, pedido)
         .toPromise()
         .then(response => {
            const pedidoAlterado = response as Pedido;
            return pedidoAlterado;
         });
   }

   buscarPorId(id: number): Promise<Pedido> {
      return this.http.get<Pedido>(`${this.pedidosUrl}/${id}`)
         .toPromise()
         .then(response => {
            const pedido = response as Pedido;
            console.log(response);
            return pedido;
         });
   }

}
