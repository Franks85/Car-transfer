import { WidthLoadingPipe } from './pipes/width-loading.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [WidthLoadingPipe],
  imports: [
    CommonModule,
  ],
  exports: [WidthLoadingPipe]
})
export class CoreModule { }
