import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrentWeatherDisplayComponent } from './current-weather-display/current-weather-display.component';
import { LocationComponent } from './location/location.component';
import { WeatherIcon } from './weather-icon/weather-icon.component';
import { ForecastDisplayComponent } from './forecast-display/forecast-display.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ForecastDisplayService } from './forecast-display/forecast-display.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CurrentWeatherDisplayComponent,
        LocationComponent,
        WeatherIcon,
        ForecastDisplayComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        FontAwesomeModule,
        HttpClientModule
      ],
      providers: [ForecastDisplayService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Weather Wizard'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Weather Wizard');
  });
});
