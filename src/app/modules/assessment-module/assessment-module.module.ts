import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentModuleRoutingModule } from './assessment-module-routing.module';
import { AssessmentHomeComponent } from './components/assessment-home/assessment-home.component';
import { AssessmentMcqComponent } from './components/assessment-mcq/assessment-mcq.component';
import { AssessmentCodeComponent } from './components/assessment-code/assessment-code.component';
import { CardComponent } from 'src/app/shared-modules/components/card/card.component';

@NgModule({
  declarations: [AssessmentHomeComponent, CardComponent, AssessmentMcqComponent, AssessmentCodeComponent],
  imports: [
    CommonModule,
    AssessmentModuleRoutingModule
  ]
})
export class AssessmentModuleModule { }
