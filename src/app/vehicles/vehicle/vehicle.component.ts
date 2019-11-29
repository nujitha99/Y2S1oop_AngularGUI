import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../../shared/vehicle.service';
import {NgForm} from '@angular/forms';
import {Vehicle} from '../../shared/vehicle.model';
import {Booking} from '../../shared/booking.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  booking: Booking;
  vehicleType: '';
  make: string;
  model: string;
  odo: string;
  vehicles: Vehicle[];
  constructor(private service: VehicleService) {
    this.booking = new Booking();
  }

  ngOnInit() {
    this.resetForm();
    this.service.getVehicle().subscribe(
      response => {
        this.vehicles = response;
      });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      plateNo: null,
      pickUpDate: '',
      dropOffDate: ''
    };
  }

  confirmBooking() {
    this.service.doBooking(this.service.formData).subscribe(result => this.booking = result);
  }

  checkAvailability() {
    this.vehicles.forEach((obj) => {
      if (this.service.formData.plateNo === obj.plateNo) {
        if (obj.availability === true) {
          this.make =    'Make         -> ' + obj.make;
          this.model =   'Model        -> ' + obj.model;
          this.odo =     'odo          -> ' + obj.odoMeter;
        }
      }
    });
  }

}
