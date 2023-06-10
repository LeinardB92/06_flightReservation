import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/model/reservation';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit{

  public flightData :any;
  public reservation : Reservation = new Reservation('','','','','','','','','');

  constructor(
    private reservationService : ReservationService,
    private router : Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.reservationService.getFlight(Number.parseInt(id))
        .subscibe((resp : any) => {this.flightData = resp});
    }
  }

  public onSubmit(){
    this.reservation.flightId = this.flightData.id;
    this.reservationService.saveReservation(this.reservation)
      .subscribe((resp : any) => {this.router.navigate(['/confirm', resp.id])});
  }

}
