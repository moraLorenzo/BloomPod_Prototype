import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickmodePageRoutingModule } from './quickmode-routing.module';

import { QuickmodePage } from './quickmode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickmodePageRoutingModule
  ],
  declarations: [QuickmodePage]
})
export class QuickmodePageModule {}
