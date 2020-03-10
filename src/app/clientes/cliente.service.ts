import { environment } from './../../environments/environment';
import { Cliente } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class ClienteFiltro {
   nomeRazaoSocial: string;
   pagina = 0;
   itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
})
export class ClienteService {

   clientesUrl: string;

   constructor(private http: HttpClient) {
      this.clientesUrl = `${environment.apiUrl}/clientes`;
   }

   pesquisar(filtro: ClienteFiltro): Promise<any> {
      let params = new HttpParams();
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
      if (filtro.nomeRazaoSocial) {
         params = params.set('nomeRazaoSocial', filtro.nomeRazaoSocial);
      }
      // if (filtro.dataVencimentoInicio) {
      //    params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('DD/MM/YYYY'));
      // }
      // if (filtro.dataVencimentoFim) {
      //    params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('DD/MM/YYYY'));
      // }
      return this.http.get(`${this.clientesUrl}?resumo`, { params })
         .toPromise()
         .then(response => {
            const clientes = response['content']
            const resultado = {
               clientes,
               total: response['totalElements']
            };
            return resultado;
         });
   }

   excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.clientesUrl}/${codigo}`)
         .toPromise()
         .then(() => null);
   }

   adicionar(cliente: Cliente): Promise<Cliente> {
      return this.http.post<Cliente>(this.clientesUrl, cliente)
         .toPromise();
   }

   atualizar(cliente: Cliente): Promise<Cliente> {
      return this.http.put(`${this.clientesUrl}/${cliente.id}`, cliente)
         .toPromise()
         .then(response => {
            const clienteAlterado = response as Cliente;
            return clienteAlterado;
         });
   }

   buscarPorId(id: number): Promise<Cliente> {
      return this.http.get<Cliente>(`${this.clientesUrl}/${id}`)
         .toPromise()
         .then(response => {
            const cliente = response as Cliente;
            console.log(response);
            return cliente;
         });
   }
}
