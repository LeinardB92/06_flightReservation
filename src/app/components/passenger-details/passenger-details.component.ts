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

  public data :any;
  public reservation : Reservation = new Reservation('','','','','','','','','');

  constructor(
    private reservationService : ReservationService,
    private router : Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(typeof(id), id)
    if (id !== null) {
      this.reservationService.getFlight(Number.parseInt(id))
        .subscribe((resp : any) => {
          this.data = resp;
          console.log(resp)
        });
    }
  }

  public onSubmit(){
    // Con fightId el backend podrá obtener el vuelo correspondiente, con saveReservation(this.reservation)
    this.reservation.flightId = this.data.id;
    console.log(this.reservation.flightId)

    this.reservationService.saveReservation(this.reservation)
      .subscribe((resp : any) => {
        console.log('confirm',  resp)
        this.router.navigate(['/confirm/'+ resp.id])
      });
  }

}
