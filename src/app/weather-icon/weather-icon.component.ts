import { Component, Input } from '@angular/core';
import { WeatherCondition } from '../models/weather-condition.enum';
import { faCloudSun, faBolt, faCloudRain, faMoon, faCloud, faSun, faCloudMoon } from '@fortawesome/free-solid-svg-icons';
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
    this.icon = this.setIcon(this.condition);
  }

  @Input() condition : WeatherCondition;
  @Input() conditionText : string;
  @Input() iconSize : string = '3x';
  @Input() isDaytime: boolean = true;

  setIcon(condition: WeatherCondition) : IconDefinition {
    if (condition === WeatherCondition.PartlyCloudy)
      return (this.isDaytime ? faCloudSun : faCloudMoon);
    else if (condition === WeatherCondition.Clear)
      return (this.isDaytime ? faSun : faMoon);
    else if (condition === WeatherCondition.Cloudy)
      return faCloud;
    else if (condition === WeatherCondition.Rainy)
      return faCloudRain;
    else if (condition === WeatherCondition.Stormy)
      return faBolt;
  }
}
