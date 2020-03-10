import { environment } from './../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Mesa } from './../core/model';
import { Injectable } from '@angular/core';

export class MesaFiltro {
   numero: number;
   pagina = 0;
   itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
})

export class MesaService {

   mesasUrl: string;

   constructor(private http: HttpClient) {
      this.mesasUrl = `${environment.apiUrl}/mesas`;
   }

   pesquisar(filtro: MesaFiltro): Promise<any> {
      let params = new HttpParams();
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
      if (filtro.numero) {
         params = params.set('numero', filtro.numero.toString());
      }
      return this.http.get(`${this.mesasUrl}`, { params })
         .toPromise()
         .then(response => {
            const mesas = response['content']
            const resultado = {
               mesas,
               total: response['totalElements']
            };
            return resultado;
         });
   }

   adicionar(mesa: Mesa): Promise<Mesa> {
      return this.http.post<Mesa>(this.mesasUrl, mesa)
         .toPromise();
   }

   atualizar(mesa: Mesa): Promise<Mesa> {
      return this.http.put(`${this.mesasUrl}/${mesa.id}`, mesa)
         .toPromise()
         .then(response => {
            const mesaAlterado = response as Mesa;
            return mesaAlterado;
         });
   }

   buscarPorId(id: number): Promise<Mesa> {
      return this.http.get<Mesa>(`${this.mesasUrl}/${id}`)
         .toPromise()
         .then(response => {
            const mesa = response as Mesa;
            return mesa;
         });
   }

   excluir(id: number): Promise<void> {
      return this.http.delete(`${this.mesasUrl}/${id}`)
         .toPromise()
         .then(() => null);
   }

   listarTodas(): Promise<any> {
      return this.http.get(this.mesasUrl)
         .toPromise()
         .then(response => response);
   }

}
