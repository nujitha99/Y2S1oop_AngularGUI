import {Component, OnInit} from '@angular/core';
import {VehicleService} from '../../shared/vehicle.service';
import {NgForm} from '@angular/forms';
import {Vehicle} from '../../shared/vehicle.model';
import {Booking} from '../../shared/booking.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  booking: Booking;
  vehicleType: string;
  make: string;
  model: string;
  odo: string;
  vehicles: Vehicle[];
  bookingList: Booking[];
  private vehicleFoundFlag: boolean;
  private vehicleAvailableFlag: boolean;
  private maxDate: number;
  private minDate: number;
  private formPickDate: number;
  private formDropDate: number;

  // constructor
  constructor(private service: VehicleService,
              private toastr: ToastrService) {
    this.booking = new Booking();
  }

  ngOnInit() {
    this.resetForm();
    // get all the vehicles into vehicle array
    this.service.getVehicle().subscribe(
      response => {
        this.vehicles = response;
      });

    // get all the schedules into bookings array
    this.service.getBookings().subscribe(
      data => {
        this.bookingList = data;
      }
    );
  }

  // method to reset form when on start
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      plateNo: null,
      pickUpDate: null,
      dropOffDate: null
    };
  }

  // method which will be invoked when 'confirm booking' button is pressed
  confirmBooking() {
    this.service.doBooking(this.service.formData).subscribe(result => this.booking = result);
    this.toastr.success('Booking recorded successfully', 'Vehicle Booking');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  // method which will be invoked when 'check availability' button is clicked
  checkAvailability() {
    this.vehicleAvailableFlag = false;
    this.vehicleFoundFlag = false;
    this.bookingList.forEach(dateObject => {
      if (this.service.formData.plateNo === dateObject.plateNo) {
        // casting into date formats
        this.minDate = Date.parse(dateObject.pickUpDate);
        this.maxDate = Date.parse(dateObject.dropOffDate);
        this.formPickDate = Date.parse(this.service.formData.pickUpDate);
        this.formDropDate = Date.parse(this.service.formData.dropOffDate);
      }
    });
    // checking if the vehicle exists and if available for the form given dates
    this.vehicles.forEach((obj) => {
      if (this.service.formData.plateNo === obj.plateNo) {
        this.vehicleFoundFlag = true;
        if (!(this.formPickDate > this.minDate && this.formPickDate < this.maxDate)) {
          if (!(this.formDropDate > this.minDate && this.formDropDate < this.maxDate)) {
            this.toastr.info('Vehicle is available for booking', 'Available');  // pop-up toastr notification
            this.vehicleAvailableFlag = true;
            this.vehicleType = 'Vehicle Type         -> ' + obj.vehicleType;
            this.make = 'Make         -> ' + obj.make;
            this.model = 'Model        -> ' + obj.model;
            this.odo = 'odo          -> ' + obj.odoMeter;
          }
        }
      }
    });
    // if there is a booking within form required dates
    if (this.vehicleFoundFlag && !this.vehicleAvailableFlag) {
      this.toastr.warning('This vehicle is booked on these dates', 'Unavailable'); // pop-up toastr notification
    }
    // if vehicle does not exist
    if (!this.vehicleFoundFlag) {
      this.toastr.error('Entered plate number is invalid', 'Invalid'); // pop-up toastr notification
    }
  }

}
