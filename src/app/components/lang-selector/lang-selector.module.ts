import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LangSelectorComponent } from './lang-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [LangSelectorComponent],
  imports: [
    MatMenuModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
  exports: [LangSelectorComponent],
})
export class LangSelectorModule {}
