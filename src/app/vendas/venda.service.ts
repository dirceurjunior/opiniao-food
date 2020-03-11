import { Venda } from '../core/model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class VendaFiltro {
   nome: string;
   // dataVencimentoInicio: Date;
   // dataVencimentoFim: Date;
   pagina = 0;
   itensPorPagina = 50;
}

@Injectable({
   providedIn: 'root'
})
export class VendaService {

   vendasUrl: string;

   constructor(private http: HttpClient) {
      this.vendasUrl = `${environment.apiUrl}/vendas`;
   }

   pesquisar(filtro: VendaFiltro): Promise<any> {
      let params = new HttpParams();
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
      // if (filtro.nome) {
      //    params = params.set('nome', filtro.nome);
      // }
      return this.http.get(`${this.vendasUrl}?resumo`, { params })
         .toPromise()
         .then(response => {
            const vendas = response['content'];
            const resultado = {
               vendas,
               total: response['totalElements']
            };
            return resultado;
         });
   }

   excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.vendasUrl}/${codigo}`)
         .toPromise()
         .then(() => null);
   }

   adicionar(venda: Venda): Promise<Venda> {
      return this.http.post<Venda>(this.vendasUrl, venda)
         .toPromise();
   }

   atualizar(venda: Venda): Promise<Venda> {
      return this.http.put(`${this.vendasUrl}/${venda.id}`, venda)
         .toPromise()
         .then(response => {
            const vendaAlterado = response as Venda;
            return vendaAlterado;
         });
   }

   buscarPorId(id: number): Promise<Venda> {
      return this.http.get<Venda>(`${this.vendasUrl}/${id}`)
         .toPromise()
         .then(response => {
            const venda = response as Venda;
            console.log(response);
            return venda;
         });
   }

}
