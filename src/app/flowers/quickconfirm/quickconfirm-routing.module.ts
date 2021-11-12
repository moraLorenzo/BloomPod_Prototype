import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickconfirmPage } from './quickconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: QuickconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickconfirmPageRoutingModule {}
