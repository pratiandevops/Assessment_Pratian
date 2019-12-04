import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentHomeComponent } from './components/assessment-home/assessment-home.component';


const routes: Routes = [
  { path: 'assessment', component: AssessmentHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentModuleRoutingModule { }
