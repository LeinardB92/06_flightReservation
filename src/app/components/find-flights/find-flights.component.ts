import { Component, OnInit } from '@angular/core';
import { Criteria } from '../../model/criteria';
import { LoginService } from 'src/app/services/login.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-flights',
  templateUrl: './find-flights.component.html',
  styleUrls: ['./find-flights.component.css']
})
export class FindFlightsComponent implements OnInit {
  criteria : Criteria = new Criteria("", "", "");

  constructor(
    private loginService : LoginService,
    private reservationService : ReservationService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.loginService.login();
  }

  onSubmit(){
    this.reservationService.getFlights(this.criteria)
      .subscribe(resp => {
        this.reservationService.flightData = resp;
        console.log(resp);
        this.router.navigate(['/displayFlights']);
      })
  }


}
