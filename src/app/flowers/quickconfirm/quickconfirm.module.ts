import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickconfirmPageRoutingModule } from './quickconfirm-routing.module';

import { QuickconfirmPage } from './quickconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickconfirmPageRoutingModule
  ],
  declarations: [QuickconfirmPage]
})
export class QuickconfirmPageModule {}
