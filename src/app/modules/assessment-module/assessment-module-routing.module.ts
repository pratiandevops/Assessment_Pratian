import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentHomeComponent } from './components/assessment-home/assessment-home.component';
import { AssessmentCodeComponent} from './components/assessment-code/assessment-code.component';
import { AuthGuard } from 'src/app/shared-modules/services/auth-guard.service';
const routes: Routes = [
  { path: 'assessment', component: AssessmentHomeComponent, canActivate: [AuthGuard]},
  { path: 'code/:id', component: AssessmentCodeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentModuleRoutingModule { }
