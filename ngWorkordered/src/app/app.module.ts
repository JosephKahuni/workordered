import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// MODULES - imports
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// my modules
import { AlertsModule } from '@alerts/alerts.module';
import { HomeModule } from '@home/home.module';
import { NavModule } from '@nav/nav.module';
import { UtilsModule } from '@utils/utils.module';

// components/directives/pipes - declarations
import { AppComponent } from './app.component';


// services/values - providers
import { JwtInterceptor } from '@utils/interceptors/jwt/jwt';



@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertsModule,
    HomeModule,
    NavModule,
    UtilsModule

  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // {
    //   provide: APP_INITIALIZER, useFactory: appInitializer,
    //   multi: true, deps: [AccountsService]
    // },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },

  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }

