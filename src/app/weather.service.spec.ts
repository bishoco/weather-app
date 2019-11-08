import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { WeatherCondition } from './models/weather-condition.enum';

describe('WeatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  it('should determine weather condition properly', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    
    expect(service.determineCondition('Chances of snow')).toEqual(WeatherCondition.Snowy);
    expect(service.determineCondition('it might rain today!')).toEqual(WeatherCondition.Rainy);
    expect(service.determineCondition('Who knows what the weather will be today?')).toEqual(WeatherCondition.Clear);
  });
});
