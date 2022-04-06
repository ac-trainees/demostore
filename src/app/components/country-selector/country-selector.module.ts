import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CountrySelectorComponent } from './country-selector.component';

@NgModule({
  declarations: [CountrySelectorComponent],
  imports: [MatMenuModule, CommonModule, MatButtonModule],
  exports: [CountrySelectorComponent],
})
export class CountrySelectorModule {}
