import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentHomeComponent } from './components/assessment-home/assessment-home.component';
import { AssessmentCodeComponent} from './components/assessment-code/assessment-code.component';
import { AssessmentMcqComponent} from './components/assessment-mcq/assessment-mcq.component';
const routes: Routes = [
  { path: 'assessment', component: AssessmentHomeComponent },
  { path: 'mcq/:id', component: AssessmentMcqComponent },
  { path: 'code/:id', component: AssessmentCodeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentModuleRoutingModule { }
