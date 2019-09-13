import { Component, OnInit, Input } from '@angular/core';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

import { CurrentWeather } from '../models/current-weather.interface';

@Component({
  selector: 'current-weather-display',
  templateUrl: './current-weather-display.component.html',
  styleUrls: ['./current-weather-display.component.css']
})
export class CurrentWeatherDisplayComponent implements OnInit {
  faCloudSun = faCloudSun;
  
  currentWeather: CurrentWeather = {
    temperature: 96,
    condition: 'partly-cloudy'

  }

  constructor() { }

  ngOnInit() {
  }

}
