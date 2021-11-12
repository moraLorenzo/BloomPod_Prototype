import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickmodePage } from './quickmode.page';

const routes: Routes = [
  {
    path: '',
    component: QuickmodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickmodePageRoutingModule {}
