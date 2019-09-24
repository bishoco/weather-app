import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrentWeatherDisplayComponent } from './current-weather-display/current-weather-display.component';
import { LocationComponent } from './location/location.component';
import { WeatherIcon } from './weather-icon/weather-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherDisplayComponent,
    LocationComponent,
    WeatherIcon
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
