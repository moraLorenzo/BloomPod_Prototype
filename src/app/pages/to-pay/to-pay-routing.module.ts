import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToPayPage } from './to-pay.page';

const routes: Routes = [
  {
    path: '',
    component: ToPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToPayPageRoutingModule {}
