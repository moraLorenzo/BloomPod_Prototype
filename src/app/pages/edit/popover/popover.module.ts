import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverComponent } from './popover.component';

@NgModule({
  declarations: [PopoverComponent],
  exports: [PopoverComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomModule {}
