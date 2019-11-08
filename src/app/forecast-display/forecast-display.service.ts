import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';

import { Forecast, ConsolidatedForecast } from '../models/forecast.interface';

@Injectable()
export class ForecastDisplayService {
    constructor() { }

    consolidateForecasts(forecasts: Array<Forecast>): Array<ConsolidatedForecast> {
        var consolidatedMap = new Map<string,ConsolidatedForecast>();        
        for (let forecast of forecasts) {            
            var consolidatedForecast = consolidatedMap.get(
                formatDate(forecast.startTime, 'yyyy-MM-dd', 'en')
            );

            consolidatedForecast = this.addForecastToConsolidated(forecast, consolidatedForecast);
            consolidatedMap.set(
                formatDate(forecast.startTime, 'yyyy-MM-dd', 'en'),
                consolidatedForecast    
            );
        }
        return Array.from(consolidatedMap.values());
    }

    addForecastToConsolidated (forecast: Forecast, consolidatedForecast: ConsolidatedForecast) : ConsolidatedForecast {
        //Initialize consolidatedForecast if it comes in empty
        if (!consolidatedForecast) {        
            consolidatedForecast = <ConsolidatedForecast>{};
            consolidatedForecast.shortForecast = '';
        }

        consolidatedForecast.date = formatDate(forecast.startTime, 'yyyy-MM-dd', 'en');

        //Sets the short forecast text. If it's daytime then it will go first. If night time, then text will go last
        if (!consolidatedForecast.shortForecast) 
            consolidatedForecast.shortForecast = forecast.shortForecast;
        else if (consolidatedForecast.shortForecast && forecast.isDaytime)
            consolidatedForecast.shortForecast = forecast.shortForecast + '. Overnight ' + consolidatedForecast.shortForecast + '.';
        else 
            consolidatedForecast.shortForecast = consolidatedForecast.shortForecast + '. Overnight ' + forecast.shortForecast + '.';;

        if (forecast.isDaytime) 
            consolidatedForecast.hiTemp = forecast.temperature;
        else
            consolidatedForecast.loTemp = forecast.temperature;
        
        consolidatedForecast.temperatureUnit = forecast.temperatureUnit;
        
        return consolidatedForecast;
    }
 }

