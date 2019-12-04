import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentBuilderModuleRoutingModule } from './assessment-builder-module-routing.module';
import { BuilderHomeComponent } from './components/builder-home/builder-home.component';

@NgModule({
  declarations: [BuilderHomeComponent],
  imports: [
    CommonModule,
    AssessmentBuilderModuleRoutingModule
  ]
})
export class AssessmentBuilderModuleModule { }
