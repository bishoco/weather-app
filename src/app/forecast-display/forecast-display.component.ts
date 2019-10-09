import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

import { Forecast, ConsolidatedForecast } from '../models/forecast.interface';
import { WeatherService } from '../weather.service';
import { ForecastDisplayService } from './forecast-display.service';

@Component({
  selector: 'forecast-display',
  templateUrl: './forecast-display.component.html',
  styleUrls: ['./forecast-display.component.scss']
})
export class ForecastDisplayComponent implements OnInit {  
  forecastArray: Array<Forecast>;
  currentDate: String;
  consolidatedForecastArray: Array<ConsolidatedForecast>;

  constructor(private weatherService: WeatherService, private forecastDisplayService: ForecastDisplayService) {   
    weatherService.forecast$.subscribe(
      forecast => {
        this.forecastArray = forecast;
        this.consolidatedForecastArray = this.forecastDisplayService.consolidateForecasts(this.forecastArray);
        console.log(this.consolidatedForecastArray);
      });
  }

  ngOnInit() {
    this.currentDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  }

}
