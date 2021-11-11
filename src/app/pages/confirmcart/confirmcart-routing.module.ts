import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmcartPage } from './confirmcart.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmcartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmcartPageRoutingModule {}
