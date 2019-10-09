import { Component } from '@angular/core';

import { CurrentWeather } from '../models/current-weather.interface';
import { WeatherService } from '../weather.service';
import { Forecast } from '../models/forecast.interface';

@Component({
  selector: 'current-weather-display',
  templateUrl: './current-weather-display.component.html',
  styleUrls: ['./current-weather-display.component.css']
})
export class CurrentWeatherDisplayComponent {
  
  currentWeather: CurrentWeather;

  constructor(private weatherService: WeatherService) {   
    weatherService.forecastHourly$.subscribe(
      forecastHourly => {
        this.currentWeather = this.getCurrentFromForecast(forecastHourly);
      });
  }
  getCurrentFromForecast(hourlyForecast: Array<Forecast>) : CurrentWeather {
    let currentWeather: CurrentWeather;
    if (hourlyForecast && hourlyForecast.length > 0) {
      let currentForecast = hourlyForecast[0];
      currentWeather = {
        temperature: currentForecast.temperature,
        condition: this.weatherService.determineCondition(currentForecast.shortForecast),
        conditionText: currentForecast.shortForecast,
        isDayTime: currentForecast.isDaytime
      }
    }
    return currentWeather;
  }
}
