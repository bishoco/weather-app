import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { WeatherCondition } from './models/weather-condition.enum';
import { Forecast } from './models/forecast.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {  
  forecastSource = new Subject<Array<Forecast>>();
  forecastHourlySource = new Subject<Array<Forecast>>();

  forecast$ = this.forecastSource.asObservable();
  forecastHourly$ = this.forecastHourlySource.asObservable();

  constructor() { }

  determineCondition (condition : String ) : WeatherCondition {
    if (condition.toLowerCase().includes('storms'))
      return WeatherCondition.Stormy;
    else if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('showers') )
      return WeatherCondition.Rainy;
    else if (condition.toLowerCase().includes('partly') || condition.toLowerCase().includes('mostly') )
      return WeatherCondition.PartlyCloudy;
    else
      return WeatherCondition.Clear;
  }
}
