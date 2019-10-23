import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { WeatherCondition } from './models/weather-condition.enum';
import { Forecast } from './models/forecast.interface';

/*
This class provides observables for the forecast data so they can be
passed easily between components.
Also, a method to determine Weather Condition.
*/

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  //The observables are used by serveral components and services to pass this info around
  forecastSource = new Subject<Array<Forecast>>();
  forecastHourlySource = new Subject<Array<Forecast>>();

  forecast$ = this.forecastSource.asObservable();
  forecastHourly$ = this.forecastHourlySource.asObservable();

  constructor() { }

  /*
    Returns a WeatherCondition enum based on the weather condition string passed in.
    I'm doing a pretty basic word lookup to determine the weather condition.
    The NWS API returns a weather condition string that has a lot of variability
    and natural language, so I did my best to determine weather condition based
    on some key words.
  */
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
