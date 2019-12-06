import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AssessmentModuleRoutingModule } from './assessment-module-routing.module';
import { AssessmentHomeComponent } from './components/assessment-home/assessment-home.component';
import { AssessmentCodeComponent } from './components/assessment-code/assessment-code.component';
import { CardComponent } from 'src/app/shared-modules/components/card/card.component';

@NgModule({
  declarations: [AssessmentHomeComponent, CardComponent, AssessmentCodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    AssessmentModuleRoutingModule,
    MonacoEditorModule.forRoot()
  ]
})
export class AssessmentModuleModule { }
