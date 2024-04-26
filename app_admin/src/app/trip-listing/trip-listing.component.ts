import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers: [TripDataService],
})
export class TripListingComponent implements OnInit {
  trips!: Trip[];

  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    //console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getTrips(): void {

    this.message = 'Searching for trips';
    this.tripDataService.getTrips().then((foundTrips) => {
      this.message = foundTrips.length > 0 ? '' : 'No trips found';
      this.trips = foundTrips;
    });
  }

  ngOnInit(): void {
    //console.log('ngOnInit');
    this.getTrips();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
