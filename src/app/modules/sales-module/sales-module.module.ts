import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesModuleRoutingModule } from './sales-module-routing.module';
import { SalesHomeComponent } from './components/sales-home/sales-home.component';
import { SalesPlayGroundComponent } from './components/sales-play-ground/sales-play-ground.component';


@NgModule({
  declarations: [SalesHomeComponent, SalesPlayGroundComponent],
  imports: [
    CommonModule,
    SalesModuleRoutingModule
  ]
})
export class SalesModuleModule { }
