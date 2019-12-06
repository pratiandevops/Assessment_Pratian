import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModulesRoutingModule } from './shared-modules-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModulesRoutingModule
  ],
  declarations: [RegistrationComponent, AuthenticationComponent]
})
export class SharedModulesModule { }
