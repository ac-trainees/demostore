import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchComponent } from './search-page/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HeaderComponent } from './header/header.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CountrySelectorModule } from './components/country-selector/country-selector.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterComponent } from './search-page/filter-component/filter.component';
import { SortComponent } from './search-page/sort-component/sort.component';
import { CardComponent } from 'src/shared/card-component/card.component';
import { SearchResultComponent } from './search-page/search-result.component/search-result.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';


@NgModule({
  declarations: [
    HeaderComponent,
    ProductDetailComponent,
    SearchComponent,
    ProductDetailComponent,
    AppComponent,
    ConfiguratorComponent,
    LandingPageComponent,
    FilterComponent,
    SortComponent,
    CardComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatCardModule,
    MatPaginatorModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CountrySelectorModule,
    MatMenuModule,
    MatToolbarModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule,
    RouterModule.forRoot([
      { path: '', component: LandingPageComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search/:query', component: SearchComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'product/configurator/:id', component: ConfiguratorComponent },
    ]),
  ],
  providers: [],
  bootstrap: [HeaderComponent, AppComponent],
  entryComponents: [ConfiguratorComponent, ProductDetailComponent]
})
export class AppModule {}
