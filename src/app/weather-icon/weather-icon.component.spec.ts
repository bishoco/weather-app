import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudSun, faBolt, faCloudRain, faMoon, faCloud, faSun, faCloudMoon, faSnowflake } from '@fortawesome/free-solid-svg-icons';

import { WeatherIcon } from './weather-icon.component';
import { WeatherCondition } from '../models/weather-condition.enum';

describe('WeatherIconComponent', () => {
  let component: WeatherIcon;
  let fixture: ComponentFixture<WeatherIcon>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FontAwesomeModule ],
      declarations: [ WeatherIcon ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set the correct weather icon', () => {
    component.determineWeatherIcon(WeatherCondition.Cloudy)
    
    expect(component.determineWeatherIcon(WeatherCondition.Cloudy)).toEqual(faCloud);
    expect(component.determineWeatherIcon(WeatherCondition.Rainy)).toEqual(faCloudRain);
    expect(component.determineWeatherIcon(WeatherCondition.PartlyCloudy)).toEqual(faCloudSun);
    expect(component.determineWeatherIcon(WeatherCondition.Stormy)).toEqual(faBolt);
    expect(component.determineWeatherIcon(WeatherCondition.Clear)).toEqual(faSun);
    component.isDaytime = false;
    expect(component.determineWeatherIcon(WeatherCondition.Clear)).toEqual(faMoon);
    expect(component.determineWeatherIcon(WeatherCondition.PartlyCloudy)).toEqual(faCloudMoon);
    expect(component.determineWeatherIcon(WeatherCondition.Snowy)).toEqual(faSnowflake);    
  });
});
