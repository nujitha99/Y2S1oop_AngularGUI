import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../../shared/vehicle.service';
import {Vehicle} from '../../shared/vehicle.model';
import {Booking} from '../../shared/booking.model';

@Component({
  selector: 'app-vehicle-collection',
  templateUrl: './vehicle-collection.component.html',
  styleUrls: ['./vehicle-collection.component.css']
})
export class VehicleCollectionComponent implements OnInit {
  vehicles: Vehicle[];
  constructor(private  service: VehicleService) { }

  ngOnInit() {
    this.service.getVehicle().subscribe(
      response => {
        this.vehicles = response;
      });
  }

  onSelect(booking: Booking) {
    this.service.formData = Object.assign({}, booking);
  }

}
