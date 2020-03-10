import { Categoria } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class CategoriaFiltro {
   descricao: string;
   categoriaPai: string;
   pagina = 0;
   itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
})
export class CategoriaService {

   categoriasUrl: string;

   constructor(private http: HttpClient) {
      this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

   pesquisar(filtro: CategoriaFiltro): Promise<any> {
      let params = new HttpParams();
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
      if (filtro.descricao) {
         params = params.set('descricao', filtro.descricao);
      }
      return this.http.get(`${this.categoriasUrl}`, { params })
         .toPromise()
         .then(response => {
            const categorias = response['content']
            const resultado = {
               categorias,
               total: response['totalElements']
            };
            return resultado;
         });
   }

   adicionar(categoria: Categoria): Promise<Categoria> {
      return this.http.post<Categoria>(this.categoriasUrl, categoria)
         .toPromise();
   }

   atualizar(categoria: Categoria): Promise<Categoria> {
      return this.http.put(`${this.categoriasUrl}/${categoria.id}`, categoria)
         .toPromise()
         .then(response => {
            const categoriaAlterado = response as Categoria;
            return categoriaAlterado;
         });
   }

   buscarPorId(id: number): Promise<Categoria> {
      return this.http.get<Categoria>(`${this.categoriasUrl}/${id}`)
         .toPromise()
         .then(response => {
            const categoria = response as Categoria;
            return categoria;
         });
   }

   excluir(id: number): Promise<void> {
      return this.http.delete(`${this.categoriasUrl}/${id}`)
         .toPromise()
         .then(() => null);
   }

   listarTodas(): Promise<any> {
      return this.http.get(this.categoriasUrl)
         .toPromise()
         .then(response => response);
   }

}
