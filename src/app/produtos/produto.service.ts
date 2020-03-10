import { Produto } from './../core/model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class ProdutoFiltro {
   nome: string;
   categoria: any;
   pagina = 0;
   itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
})
export class ProdutoService {

   produtosUrl: string;

   constructor(private http: HttpClient) {
      this.produtosUrl = `${environment.apiUrl}/produtos`;
   }

   pesquisar(filtro: ProdutoFiltro): Promise<any> {
      let params = new HttpParams();
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
      if (filtro.nome) {
         params = params.set('nome', filtro.nome);
      }
      if (filtro.categoria) {
         params = params.set('categoria', filtro.categoria);
      }
      // console.log(`${this.produtosUrl}?resumo`, { params });
      return this.http.get(`${this.produtosUrl}`, { params })
         .toPromise()
         .then(response => {
            const produtos = response['content']
            const resultado = {
               produtos,
               total: response['totalElements']
            };
            // console.log(resultado);
            return resultado;
         });
   }

   excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.produtosUrl}/${codigo}`)
         .toPromise()
         .then(() => null);
   }

   adicionar(produto: Produto): Promise<Produto> {
      return this.http.post<Produto>(this.produtosUrl, produto)
         .toPromise();
   }

   atualizar(produto: Produto): Promise<Produto> {
      return this.http.put(`${this.produtosUrl}/${produto.id}`, produto)
         .toPromise()
         .then(response => {
            const produtoAlterado = response as Produto;
            return produtoAlterado;
         });
   }

   buscarPorId(id: number): Promise<Produto> {
      return this.http.get<Produto>(`${this.produtosUrl}/${id}`)
         .toPromise()
         .then(response => {
            const produto = response as Produto;
            return produto;
         });
   }

}
