import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentModuleRoutingModule } from './assessment-module-routing.module';
import { AssessmentHomeComponent } from './components/assessment-home/assessment-home.component';


@NgModule({
  declarations: [AssessmentHomeComponent],
  imports: [
    CommonModule,
    AssessmentModuleRoutingModule
  ]
})
export class AssessmentModuleModule { }
