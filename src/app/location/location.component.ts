import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { NwsApiService } from '../nws-api.service';
import { Location } from '../models/location.interface';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  coordinates:Coordinates;
  location:Location;

  constructor(private locationService: LocationService, private nwsApiService: NwsApiService) {
    locationService.coordinates$.subscribe(
      coordinates => {
        this.coordinates = coordinates;
    });
    nwsApiService.location$.subscribe(
      location => {
        this.location = location;
    });

  }


  ngOnChanges() {
  }

  ngOnInit() {
  }
}
