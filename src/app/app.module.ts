import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesModuleModule } from './modules/sales-module/sales-module.module';
import { AssessmentBuilderModuleModule } from './modules/assessment-builder-module/assessment-builder-module.module';
import { AssessmentModuleModule } from './modules/assessment-module/assessment-module.module';
import { SharedModulesModule } from './shared-modules/shared-modules.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './shared-modules/services/interceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SalesModuleModule,
    AssessmentBuilderModuleModule,
    AssessmentModuleModule,
    SharedModulesModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AppRoutingModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
