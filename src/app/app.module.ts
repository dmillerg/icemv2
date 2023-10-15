import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoticiaFuentePipe } from './core/pipes/noticias/noticias.pipe.spec';
import { ROOT_REDUCERS } from './shared/state/app.state';


@NgModule({
  declarations: [
    AppComponent,
    NoticiaFuentePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    StoreModule.forRoot(ROOT_REDUCERS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
