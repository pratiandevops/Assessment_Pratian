import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';


const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'comingsoon', component: CommingSoonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedModulesRoutingModule { }
