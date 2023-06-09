import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-flights',
  templateUrl: './display-flights.component.html',
  styleUrls: ['./display-flights.component.css']
})
export class DisplayFlightsComponent implements OnInit {
  data : any;

  constructor(private reservationService : ReservationService, private router : Router){}

  ngOnInit(): void {
    this.data = this.reservationService.flightData;
  }

  onSelect(id : number){
    this.router.navigate(['/passengerDetails/' + id]);
  }
}
