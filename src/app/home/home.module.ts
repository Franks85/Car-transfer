import { UiModule } from './../ui/ui.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';

@NgModule({
  declarations: [HomeComponent, ServicesSectionComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    UiModule
  ]
})
export class HomeModule { }
