import { WeatherCondition } from './weather-condition.enum';

export interface CurrentWeather {
    temperature: number;
    condition: WeatherCondition;
    conditionText: String;
    isDayTime: boolean;
  }