import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../shared/vehicle.service';
import {Vehicle} from '../../shared/vehicle.model';
import {Booking} from '../../shared/booking.model';

@Component({
  selector: 'app-vehicle-collection',
  templateUrl: './vehicle-collection.component.html',
  styleUrls: ['./vehicle-collection.component.css']
})
export class VehicleCollectionComponent implements OnInit {
  vehicles: Vehicle[]; // list to store retrieved vehicle objects

  // constructor
  constructor(private  service: VehicleService) {
  }

  ngOnInit() {
    this.service.getVehicle().subscribe(
      response => {
        this.vehicles = response;
      });
  }

  // sets the plate number in the input field when clicked on the table's plate number field
  onSelect(booking: Booking) {
    this.service.formData = Object.assign({}, booking);
  }

}
