import { Unidade } from './../core/model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class UnidadeFiltro {
   descricao: string;
   // abreviacao: string;
   pagina = 0;
   itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
})
export class UnidadeService {

   unidadesUrl: string;

   constructor(private http: HttpClient) {
      this.unidadesUrl = `${environment.apiUrl}/unidades`;
   }

   pesquisar(filtro: UnidadeFiltro): Promise<any> {
      let params = new HttpParams();
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
      if (filtro.descricao) {
         params = params.set('descricao', filtro.descricao);
      }
      return this.http.get(`${this.unidadesUrl}`, { params })
         .toPromise()
         .then(response => {
            const unidades = response['content']
            const resultado = {
               unidades,
               total: response['totalElements']
            };
            return resultado;
         });
   }

   adicionar(unidade: Unidade): Promise<Unidade> {
      return this.http.post<Unidade>(this.unidadesUrl, unidade)
         .toPromise();
   }

   atualizar(unidade: Unidade): Promise<Unidade> {
      return this.http.put(`${this.unidadesUrl}/${unidade.id}`, unidade)
         .toPromise()
         .then(response => {
            const unidadeAlterado = response as Unidade;
            return unidadeAlterado;
         });
   }

   buscarPorId(id: number): Promise<Unidade> {
      return this.http.get<Unidade>(`${this.unidadesUrl}/${id}`)
         .toPromise()
         .then(response => {
            const unidade = response as Unidade;
            return unidade;
         });
   }

   excluir(id: number): Promise<void> {
      return this.http.delete(`${this.unidadesUrl}/${id}`)
         .toPromise()
         .then(() => null);
   }

   listarTodas(): Promise<any> {
      return this.http.get(this.unidadesUrl)
         .toPromise()
         .then(response => response);
   }

}
