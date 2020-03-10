import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   oauthTokenUrl: string;
   tokensRenokeUrl: string;
   jwtPayload: any;

   constructor(
      private http: HttpClient,
      private jwtHelper: JwtHelperService,
   ) {
      this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
      this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
      this.carregarToken();
   }

   login(usuario: string, senha: string): Promise<void> {
      const headers = new HttpHeaders()
         .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
         .set('Content-Type', 'application/x-www-form-urlencoded');
      const body = `username=${usuario}&password=${senha}&grant_type=password`;
      return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
         .toPromise()
         .then(response => {
            console.log(response);
            this.armazenarToken(response['access_token']);
         })
         .catch(response => {
            const responseError = response.error;
            if (response.status === 400) {
               if (responseError.error === 'invalid_grant') {
                  return Promise.reject('Usuário ou senha inválida');
               }
            }
            return Promise.reject(response);
         });
   }

   obterNovoAccessToken(): Promise<void> {
      const headers = new HttpHeaders()
         .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
         .set('Content-Type', 'application/x-www-form-urlencoded');
      const body = 'grant_type=refresh_token';
      return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
         .toPromise()
         .then(response => {
            this.armazenarToken(response['access_token']);
            console.log('Novo Access Token Criado');
            return Promise.resolve(null);
         })
         .catch(response => {
            console.log("Erro ao Renovar Token", response);
            return Promise.resolve(null);
         });
   }

   private armazenarToken(token: string) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
      localStorage.setItem('token', token)
   }

   private carregarToken() {
      const token = localStorage.getItem('token');
      if (token) {
         this.armazenarToken(token);
      }
   }

   temPermissao(permissao: string) {
      return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
   }

   isAccessTokenInvalido() {
      const token = localStorage.getItem('token');
      return !token || this.jwtHelper.isTokenExpired(token);
   }

   temQualquerPermissao(roles) {
      for (const role of roles) {
         if (this.temPermissao(role)) {
            return true;
         }
      }
      return false;
   }

   logout() {
      return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
         .toPromise()
         .then(() => {
            localStorage.removeItem('token');
            this.jwtPayload = null;
         });
   }


}
