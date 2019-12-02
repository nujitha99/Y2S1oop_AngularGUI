import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vehicle} from './vehicle.model';
import {Booking} from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  formData: Booking; // extracts the form input data
  // constructor
  constructor(private http: HttpClient) {}
  // method to get the vehicle list from the backend
  getVehicle() {
    return this.http.get<Vehicle[]>('http://localhost:8080/api/vehicles');
  }
  // method to send booking details to the backend
  doBooking(formData) {
    return this.http.post<Booking>('http://localhost:8080/api/booking', this.formData);
  }
  // method to get bookings list from backend
  getBookings() {
    return this.http.get<Booking[]>('http://localhost:8080/api/bookinglist');
  }
}
