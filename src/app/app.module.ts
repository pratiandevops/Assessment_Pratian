import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesModuleModule } from './modules/sales-module/sales-module.module';
import { AssessmentBuilderModuleModule } from './modules/assessment-builder-module/assessment-builder-module.module';
import { AssessmentModuleModule } from './modules/assessment-module/assessment-module.module';
import { CardComponent } from './shared-modules/components/card/card.component';
import { SharedModulesModule } from './shared-modules/shared-modules.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SalesModuleModule,
    AppRoutingModule,
    AssessmentBuilderModuleModule,
    AssessmentModuleModule,
     SharedModulesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
