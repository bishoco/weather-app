import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { WeatherService } from '../weather.service';
import { Location } from '../models/location.interface';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  coordinates:Coordinates;
  location:Location;

  constructor(private locationService: LocationService, private weatherService: WeatherService) {
    locationService.coordinates$.subscribe(
      coordinates => {
        this.coordinates = coordinates;
    });
    weatherService.location$.subscribe(
      location => {
        this.location = location;
    });

  }


  ngOnChanges() {
  }

  ngOnInit() {
  }
}
