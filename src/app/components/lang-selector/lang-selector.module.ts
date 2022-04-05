import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LangSelectorComponent } from './lang-selector.component';

@NgModule({
  declarations: [LangSelectorComponent],
  imports: [MatMenuModule, CommonModule, MatButtonModule],
  exports: [],
})
export class LangSelectorModule {}
