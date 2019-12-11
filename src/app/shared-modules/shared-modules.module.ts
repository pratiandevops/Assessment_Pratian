import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModulesRoutingModule } from './shared-modules-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModulesRoutingModule
  ],
  declarations: [RegistrationComponent, AuthenticationComponent, CommingSoonComponent]
})
export class SharedModulesModule { }
