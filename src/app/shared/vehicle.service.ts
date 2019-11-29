import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vehicle} from './vehicle.model';
import {Booking} from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  formData: Booking;
  constructor(private http: HttpClient) {}
  getVehicle() {
    return this.http.get<Vehicle[]>('http://localhost:8080/api/vehicles');
  }
  doBooking(formData) {
    console.log();
    return this.http.post<Booking>('http://localhost:8080/api/booking', this.formData);
  }
}
