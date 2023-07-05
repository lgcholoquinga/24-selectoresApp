import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CountryRoutingModule } from './country-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

@NgModule({
  declarations: [SelectorPageComponent, LayoutPageComponent],
  imports: [CommonModule, CountryRoutingModule, ReactiveFormsModule],
})
export class CountryModule {}
