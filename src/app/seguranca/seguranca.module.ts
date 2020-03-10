import { environment } from './../../environments/environment';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

export function tokenGetter(): string {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [LoginFormComponent],
   imports: [
      CommonModule,
      FormsModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: environment.tokenWhitelistedDomains,
            blacklistedRoutes: environment.tokenBlacklistedRoutes,
         }
      }),
      InputTextModule,
      ButtonModule,
      SegurancaRoutingModule,
   ],
   providers: [
      JwtHelperService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: MoneyHttpInterceptor,
         multi: true
      },
      AuthGuard,
   ]
})
export class SegurancaModule { }
