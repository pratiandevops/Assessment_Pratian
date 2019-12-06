import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentHomeComponent } from './components/assessment-home/assessment-home.component';
import { AssessmentCodeComponent} from './components/assessment-code/assessment-code.component';
const routes: Routes = [
  { path: 'assessment', component: AssessmentHomeComponent },
  { path: 'code/:id', component: AssessmentCodeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentModuleRoutingModule { }
