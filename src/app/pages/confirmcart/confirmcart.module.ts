import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmcartPageRoutingModule } from './confirmcart-routing.module';

import { ConfirmcartPage } from './confirmcart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmcartPageRoutingModule
  ],
  declarations: [ConfirmcartPage]
})
export class ConfirmcartPageModule {}
