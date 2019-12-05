import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesModuleModule } from './modules/sales-module/sales-module.module';
import { AssessmentBuilderModuleModule } from './modules/assessment-builder-module/assessment-builder-module.module';
import { AssessmentModuleModule } from './modules/assessment-module/assessment-module.module';
import { SharedModulesModule } from './shared-modules/shared-modules.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
