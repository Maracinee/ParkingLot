import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { TestAPIComponentComponent } from './test-apicomponent/test-apicomponent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CarBrandsComponent } from './components/car-brands/car-brands.component';
import { CarTypesComponent } from './components/car-types/car-types.component';
import { CarsComponent } from './components/cars/cars.component';
import { ParkingLotComponent } from './components/parking-lot/parking-lot.component';

@NgModule({
  declarations: [
    AppComponent,
    TestAPIComponentComponent,
    ToolbarComponent,
    CarBrandsComponent,
    CarTypesComponent,
    CarsComponent,
    ParkingLotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
