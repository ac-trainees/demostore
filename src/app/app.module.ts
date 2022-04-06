import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HeaderComponent } from './header/header.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductDetailComponent,
    SearchComponent,
    ProductDetailComponent,
    AppComponent,
    ConfiguratorComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: LandingPageComponent},
      {path: 'search', component: SearchComponent},
      {path: 'search/:query', component: SearchComponent},
      {path: 'product/:id', component: ProductDetailComponent},
      {path: 'configurator/:id', component: ConfiguratorComponent}
    ])
  ],
  providers: [],
  bootstrap: [HeaderComponent, AppComponent]
})
export class AppModule { }
