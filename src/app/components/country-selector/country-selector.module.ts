import { CommonModule } from '@angular/common';
import { EventEmitter, Input, NgModule, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CountrySelectorComponent } from './country-selector.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CountrySelectorComponent],
  imports: [
    MatMenuModule,
    CommonModule,
    MatButtonModule,
    MatSelectCountryModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FormsModule,
  ],
  exports: [CountrySelectorComponent],
})
export class CountrySelectorModule {}
