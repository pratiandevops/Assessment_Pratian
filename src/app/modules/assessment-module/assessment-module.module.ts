import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AssessmentModuleRoutingModule } from './assessment-module-routing.module';
import { AssessmentHomeComponent } from './components/assessment-home/assessment-home.component';
import { AssessmentMcqComponent } from './components/assessment-mcq/assessment-mcq.component';
import { AssessmentCodeComponent } from './components/assessment-code/assessment-code.component';

@NgModule({
  declarations: [AssessmentHomeComponent, AssessmentMcqComponent, AssessmentCodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    AssessmentModuleRoutingModule,
    MonacoEditorModule.forRoot()
  ]
})
export class AssessmentModuleModule { }
