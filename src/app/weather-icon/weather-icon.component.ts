import { Component, Input } from '@angular/core';
import { WeatherCondition } from '../models/weather-condition.enum';
import { faCloudSun, faBolt, faCloudRain, faMoon, faCloud, faSun, faCloudMoon, faSnowflake,  } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.css']
})
export class WeatherIcon {
  icon: IconDefinition;

  constructor() { }

  ngOnChanges() {
    this.icon = this.determineWeatherIcon(this.condition);
  }

  @Input() condition : WeatherCondition;
  @Input() conditionText : string;
  @Input() iconSize : string = '3x';
  @Input() isDaytime: boolean = true;

  determineWeatherIcon(condition: WeatherCondition) : IconDefinition {
    switch (condition) {
      case  WeatherCondition.PartlyCloudy:
        return (this.isDaytime ? faCloudSun : faCloudMoon);
      case WeatherCondition.Clear:
        return (this.isDaytime ? faSun : faMoon);
      case WeatherCondition.Cloudy:
        return faCloud;
      case WeatherCondition.Rainy:
        return faCloudRain;
      case WeatherCondition.Stormy:
        return faBolt;
      case WeatherCondition.Snowy:
        return faSnowflake;
      default:
        return (this.isDaytime ? faSun : faMoon);;
    }
  }
}
