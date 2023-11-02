import { LOCALE_ID, NgModule } from '@angular/core';
import localEs from '@angular/common/locales/es';
import {
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData,
} from '@angular/common';
registerLocaleData(localEs, 'es');
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoticiaFuentePipe } from './core/pipes/noticias/noticias.pipe.spec';
import { ROOT_REDUCERS } from './shared/state/app.state';
import { BusquedaComponent } from './core/components/busqueda/busqueda.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpCancelInterceptor } from './core/interceptor/http-cancel.interceptor';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [AppComponent, NoticiaFuentePipe, BusquedaComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    NgApexchartsModule,
    StoreModule.forRoot(ROOT_REDUCERS),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MatSnackBar },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCancelInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
