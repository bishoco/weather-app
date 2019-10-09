import { TestBed } from '@angular/core/testing';

import { ForecastDisplayService } from './forecast-display.service';
import { Forecast, ConsolidatedForecast } from '../models/forecast.interface';

describe('ForecastDisplayService', () => {
  let service: ForecastDisplayService;
  beforeEach(() => { service = new ForecastDisplayService(); });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert Forecast to ConsolidatedForecast', () => {
    let forecastDay : Forecast = {
      number: 1,
      name: "Wednesday",
      startTime: new Date("2019-10-09T14:00:00-05:00"),
      endTime: new Date("2019-10-09T18:00:00-05:00"),
      isDaytime: true,
      temperature: 68,
      temperatureUnit: "F",
      windSpeed: "15 mph",
      windDirection: "S",
      shortForecast: "Mostly Cloudy",
      detailedForecast: "Mostly cloudy, with a high near 68. South wind around 15 mph, with gusts as high as 35 mph."
    }
    let forecastNight : Forecast = {
      number: 2,
      name: "Tonight",
      startTime: new Date("2019-10-09T18:00:00-05:00"),
      endTime: new Date("2019-10-10T06:00:00-05:00"),
      isDaytime: false,
      temperature: 58,
      temperatureUnit: "F",
      windSpeed: "15 mph",
      windDirection: "SE",
      shortForecast: "Mostly Cloudy then Slight Chance Showers And Thunderstorms",
      detailedForecast: "A slight chance of showers and thunderstorms after midnight. Mostly cloudy, with a low around 58. Southeast wind around 15 mph, with gusts as high as 30 mph. Chance of precipitation is 20%."
    }
    var consolidatedForecast: ConsolidatedForecast;
    consolidatedForecast = service.convertForecastToConsolidated(forecastDay, consolidatedForecast);
    consolidatedForecast = service.convertForecastToConsolidated(forecastNight, consolidatedForecast);
    expect(consolidatedForecast.hiTemp).toEqual(68);
    expect(consolidatedForecast.loTemp).toEqual(58);
    expect(consolidatedForecast.temperatureUnit).toEqual('F');
    expect(consolidatedForecast.shortForecast).toEqual('Mostly Cloudy then Mostly Cloudy then Slight Chance Showers And Thunderstorms');
  });
});
