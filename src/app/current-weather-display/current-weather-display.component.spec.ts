import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CurrentWeatherDisplayComponent } from './current-weather-display.component';
import { WeatherIcon } from '../weather-icon/weather-icon.component';
import { WeatherService } from '../weather.service';
import { NwsApiService } from '../nws-api.service';

describe('CurrentWeatherDisplayComponent', () => {
  let component: CurrentWeatherDisplayComponent;
  let fixture: ComponentFixture<CurrentWeatherDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FontAwesomeModule ],
      declarations: [ CurrentWeatherDisplayComponent, WeatherIcon ],
      providers: [ WeatherService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
