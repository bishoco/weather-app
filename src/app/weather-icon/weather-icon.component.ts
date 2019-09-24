import { Component, Input } from '@angular/core';
import { WeatherCondition } from '../models/weather-condition.enum';
import { faCloudSun, faBolt, faCloudRain, faMoon, faCloud, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.css']
})
export class WeatherIcon {
  weatherConditionEnum = WeatherCondition;
  faCloudSun = faCloudSun;
  faSun = faSun;
  faCloud = faCloud;
  faCloudRain = faCloudRain;
  faBolt = faCloudSun;

  constructor() { }

  @Input() condition : WeatherCondition;
  @Input() conditionText : string;
  @Input() iconSize : string = '3x';
}
