import { Component, OnInit, Input } from '@angular/core';

import { CurrentWeather } from '../models/current-weather.interface';
import { WeatherCondition } from '../models/weather-condition.enum';
import { WeatherService } from '../weather.service';
import { NwsApiService } from '../nws-api.service';
import { Forecast } from '../models/forecast.interface';

@Component({
  selector: 'current-weather-display',
  templateUrl: './current-weather-display.component.html',
  styleUrls: ['./current-weather-display.component.css']
})
export class CurrentWeatherDisplayComponent implements OnInit {
  
  currentWeather: CurrentWeather;

  constructor(private weatherService: WeatherService, private nwsApiService: NwsApiService) {   
    weatherService.forecastHourly$.subscribe(
      forecastHourly => {
        this.currentWeather = this.getCurrentFromForecast(forecastHourly);
      });
  }

  ngOnInit() {
  }

  getCurrentFromForecast(hourlyForecast: Array<Forecast>) : CurrentWeather {
    let currentWeather: CurrentWeather;
    if (hourlyForecast && hourlyForecast.length > 0) {
      let currentForecast = hourlyForecast[0];
      currentWeather = {
        temperature: currentForecast.temperature,
        condition: this.weatherService.determineCondition(currentForecast.shortForecast),
        conditionText: currentForecast.shortForecast
      }
    }
    return currentWeather;
  }
}
