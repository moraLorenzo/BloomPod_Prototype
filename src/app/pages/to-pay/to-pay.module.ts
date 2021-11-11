import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToPayPageRoutingModule } from './to-pay-routing.module';

import { ToPayPage } from './to-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToPayPageRoutingModule
  ],
  declarations: [ToPayPage]
})
export class ToPayPageModule {}
