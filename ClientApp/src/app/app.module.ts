import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoader } from './core/script-loader';
import { AppInjector } from './app-injector.service';
import HttpContext, { ApiInterceptor } from './core/httpContext';
import { DynamicControlBinder } from "./core/common/core-providers";
import ArialTranslate from './core/translateService';
import { TreeModule } from '@circlon/angular-tree-component';
import { Environment } from './core/common/globals';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TreeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    ScriptLoader, HttpContext, ArialTranslate, DynamicControlBinder, Environment],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.setInjector(injector)
  }
}
