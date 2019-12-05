import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesHomeComponent } from './components/sales-home/sales-home.component';
import { SalesPlayGroundComponent } from './components/sales-play-ground/sales-play-ground.component';

const routes: Routes = [
  { path: 'home', component: SalesHomeComponent },
  { path: 'playground', component: SalesPlayGroundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesModuleRoutingModule { }
