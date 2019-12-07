import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './shared-modules/components/authentication/authentication.component';
import { RegistrationComponent } from './shared-modules/components/registration/registration.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'login', component: AuthenticationComponent, outlet: "authentication"},
  { path: 'registration', component: RegistrationComponent, outlet: "authentication"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
