import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesModuleModule } from './modules/sales-module/sales-module.module';
import { AssessmentBuilderModuleModule } from './modules/assessment-builder-module/assessment-builder-module.module';
import { AssessmentModuleModule } from './modules/assessment-module/assessment-module.module';
import { SharedModulesModule } from './shared-modules/shared-modules.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationComponent } from './shared-module/components/authentication/authentication.component';
import { RegistrationComponent } from './shared-module/components/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SalesModuleModule,
    AssessmentBuilderModuleModule,
    AssessmentModuleModule,
    SharedModulesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
