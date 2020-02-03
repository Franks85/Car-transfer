import { environment } from './../environments/environment';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth';
import { UiModule, MainNavComponent } from './ui';
import { CoreModule } from './core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './core/interceptors/auth.interceptor.service';
import { DashboardModule } from './dashboard/dashboard.module';

import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [AppComponent, MainNavComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    UiModule,
    AuthModule,
    HomeModule,
    DashboardModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
