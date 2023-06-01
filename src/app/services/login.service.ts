import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Propiedades
  public httpOptions: any;

  // Constructor
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'aplication/json'
      })
    }
   }

  public login(){
    let user = {
      "username":"salchi",
      "password": "test1234%"
    };
    this.http.post('http://127.0.0.1:8000/api-token-auth/',JSON.stringify(user),this.httpOptions)
    .subscribe(data => {
      this.httpOptions = {
        headers : new HttpHeaders({
          'Content-Type' : 'aplication/json',
          'Authorization' : 'Token ' + data['token']
        })
      }
    })
  }
}
